const express = require('express')
const User = require('./models/User')

const router = express.Router();

router.get('/', (req, res) => {
    res.send("test")
});

router.post('/signup', (req, res) => {
  console.log(req.body)
})

module.exports = router