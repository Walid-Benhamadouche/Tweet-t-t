const server = require('./server')

server.listen(5000, (req, res) => {
    console.log("listening in 5000")
})