const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const postsRoute = require('./user')
const tweet = require('./tweet')
const MongoDBStore = require('connect-mongodb-session')(session)
require('dotenv/config')
const genuuid = require('uuid/v4');

mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true,useUnifiedTopology: true },()=>{console.log("connected to mongo")})

//`Hi! Server is listening on port ${port}`
const app = express()

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
app.use(bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: store,
    name: "testcookie",
    genid: function(req) {
        console.log('session id created');
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

const port = 5000

app.listen(port)