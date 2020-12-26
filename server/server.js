const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const postsRoute = require('./user')
require('dotenv/config')

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  ()=>{console.log("connected to mongo")}
  )

//`Hi! Server is listening on port ${port}`
const app = express()

app.use(bodyParser.json())

app.use('/posts', postsRoute)

app.use(cors())
const port = 5000

app.listen(port)