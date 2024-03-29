const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const postsRoute = require('./server/user')
const tweet = require('./server/tweet')
const follow = require('./server/follow')
const chat = require('./server/chat')
const MongoDBStore = require('connect-mongodb-session')(session)
require('dotenv/config')
const genuuid = require('uuid/v4');

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{console.log("connected to mongo")})

//`Hi! Server is listening on port ${port}`
const server = require('http').Server(app)
var people={};
const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    people[socket.handshake.query.userId] = socket.id
    //console.log("socket.id", people)
    socket.on('message', (message) => {
        //console.log("on message ", message);
        //console.log("socket.id from table",people);
        io.to(people[message.receiverId]).emit('message', message );
    });
})

const store = new MongoDBStore(
    {
    uri: process.env.DB_CONNECTION,
    databaseName: 'tweet-t-t',
    collection: 'mySession',
    ttl: 24 * 60 * 60,
    },
    function(error){
    });

store.on('error', function(error){
    console.log("error in the store.on section")
})

app.use(cors({
    origin: [
      'http://localhost:8080',
      'https://localhost:8080'
    ],
    credentials: true,
    exposedHeaders: ['set-cookie']
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb'}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: store,
    name: "testcookie",
    genid: function(req) {
        //console.log('session id created');
        return genuuid()
      },
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(process.env.SESSION_MAX_AGE)
    }
}))

app.use('/users', postsRoute)
app.use('/tweet', tweet)
app.use('/follow', follow)
app.use('/chat', chat)

const port = 5000

server.listen(process.env.PORT || port)
module.exports = server