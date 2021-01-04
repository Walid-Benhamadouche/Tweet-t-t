const express = require('express')
const cors = require('cors')
const fs = require('fs')
const User = require('./models/User')
const router = express.Router();

//check if user is logged in
router.get('/auth', async (req, res) => {
  //console.log(req.session.loggedIn)
  if(!req.session.loggedIn===true) {
    //console.log("returning false")
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
      IsAdmin: user.IsAdmin,
      imgT: user.img.contentType,
      img: user.img.data
    }
    //console.log("user image object", user.img.data)
    res.json(userInfo)
  }catch(err){
    //console.log(err)
  }
})

router.get('/getUserId', async (req, res) => {
  try{
    const user = await User.findOne({ _id: req.query._id})
    const userInfo = {
      _id: user._id, 
      UserName: user.UserName,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      IsAdmin: user.IsAdmin,
      imgT: user.img.contentType,
      img: user.img.data
    }
    //console.log("user image object", user.img)
    res.json(userInfo)
  }catch(err){
    //console.log(err)
  }
})

//log in and creat cookie
router.get('/login', async (req, res) => {
    try{
      //console.log("inside log in function")
      const user = await User.findOne({ Email: req.query.Email, HashCode: req.query.HashCode})
      req.session.regenerate(function(err) {
        req.session.loggedIn = true
        req.session._id = user._id;
        //console.log(req.session)
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
  try{
    const user = new User({
      UserName: req.query.UserName,
      Email: req.query.Email,
      HashCode: req.query.Password,
      FirstName: req.query.FirstName,
      LastName: req.query.LastName,
      IsAdmin: false
    })
    const savedUser = await user.save()
    req.session.regenerate(function(err) {
      req.session.loggedIn = true
      req.session._id = savedUser._id;
      //console.log(req.session)
      req.session.save(function(err) {
        if(!err) console.log("saved to store")
        res.cookie(req.session.cookie).send()
      })
})
  }
  catch(err){
    res.json({ message: err })
  }
})

router.put('/update', async (req, res) => {
  try{
    //console.log("updated !!: ",req.body.data.imageType)
    const user = await User.updateOne({_id: req.session._id}, {img: {
      data: req.body.data.imageFile,
      contentType: req.body.data.imageType
    }})
    res.json(user)
  }catch(err){
    res.json({ message: err })
  }
})

module.exports = router;