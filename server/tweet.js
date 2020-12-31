const express = require('express')
const Tweet = require('./models/Tweet')
const router = express.Router()

router.post('/tweet', async (req, res) => {
    try{
        const TweetContent = new Tweet({
            UserId: req.query.UserIdT,
            Body: req.query.Body,
            UserName: req.query.UserName
        })
        const savedTweet = await TweetContent.save()
        console.log("trying to post after save", savedTweet)
        res.json(savedTweet)
    }catch(err){
        res.json({ message: err })
        console.log(err)
    }
})

router.get('/getTweets', async (req, res) => {
    try{
        const tweets = await Tweet.find({ UserId: req.query.UserIdT})
        res.json(tweets)
    }catch(err){
        res.json({ message: err })
    }
})

module.exports = router;