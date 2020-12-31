const express = require('express')
const Follow = require('./models/Follow')
const router = express.Router()

router.post('/follow', async (req, res) => {
    try{
        const FollowContent = new Follow({
            Follower: req.session._id,
            Following: req.query.userId
        })
        const savedFollow = await FollowContent.save()
        console.log("trying to post after save", savedFollow)
        res.json(savedFollow)
    }catch(err){
        res.json({ message: err })
        console.log(err)
    }
})

router.get('/getFollowings', async (req, res) => {
    try{
        const following = await Follow.find({ Follower:  req.query._id})
        res.json(following)
    }catch(err){
        res.json({ message: err })
    }
})

router.get('/getFollowers', async (req, res) => {
    try{
        const follower = await Follow.find({ Following:  req.query._id})
        res.json(follower)
    }catch(err){
        res.json({ message: err })
    }
})

router.delete('/unfollow', async (req, res) => {
    try{
        const follower = await Follow.deleteOne({ Follower:  req.session._id, Following: req.query._id})
        console.log(follower)
        res.json(follower)
    }catch(err){
        res.json({ message: err })
    }
})

module.exports = router;