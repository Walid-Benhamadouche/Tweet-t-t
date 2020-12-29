const express = require('express')
const cors = require('cors')
const User = require('./models/User')
const router = express.Router();

//check if user is logged in
router.get('/auth', async (req, res) => {
  console.log(req.session.loggedIn)
  if(!req.session.loggedIn===true) {
    console.log("returning false")
    res.json({loggedIn: false})}
  else res.json({loggedIn: true})
});

//get user information when page changes
router.get('/getUser', async (req, res) => {
  try{
    const user = await User.findOne({ _id: req.session._id})
    const userInfo = {
      _id: user._id, 
      UserName: user.UserName,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      IsAdmin: user.IsAdmin
    }
    res.json(userInfo)
  }catch(err){
    console.log(err)
  }
})


//log in and creat cookie
router.get('/login', async (req, res) => {
    try{
      console.log("inside log in function")
      const user = await User.findOne({ Email: req.query.Email, HashCode: req.query.HashCode})
      req.session.regenerate(function(err) {
        req.session.loggedIn = true
        req.session._id = user._id;
        console.log(req.session)
        req.session.save(function(err) {
          if(!err) console.log("saved to store")
          res.cookie(req.session.cookie).send()
        })
  })
    }catch(err){
      res.json({ message: err })
    }
});

router.get('/all', async (req, res) => {
  /*try{
    const singleUser = await User.find()
    res.json(singleUser)
  }catch(err){
    res.json({ message: err })
  }*/
  //console.log("this is the /all print", req.session._id)
})

router.post('/signup', async (req, res) => {
  const user = new User({
    UserName: req.query.UserName,
    Email: req.query.Email,
    HashCode: req.query.Password,
    FirstName: req.query.FirstName,
    LastName: req.query.LastName,
    IsAdmin: false
  });
  try{
    const savedUser = await user.save()
    res.json(savedUser)
  }
  catch(err){
    res.json({ message: err })
  }
})

module.exports = router;