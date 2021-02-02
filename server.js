const server = require('./server/server')

server.listen(process.env.PORT || 5000, (req, res) => {
    console.log("listening in 5000")
})