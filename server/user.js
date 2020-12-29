const express = require('express')
const cors = require('cors')
const User = require('./models/User')
const router = express.Router();


router.get('/login', async (req, res) => {
  try{
    const user = await User.findOne({ Email: req.query.Email, HashCode: req.query.HashCode})
    const userInfo = {
      _id: user._id, 
      UserName: user.UserName,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      IsAdmin: user.IsAdmin
    }
    req.session.regenerate(function(err) {
      req.session.UserName = userInfo.UserName;
      req.session.cookie.UserName = userInfo.UserName
      req.session.save(function(err) {
        if(!err) console.log("saved to store")
        console.log(req.session.UserName)
      res.cookie(req.session.cookie)
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
  console.log("this is the /all print", req.session.UserName)
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