const express = require('express')
const Chat = require('./models/Chat')
const Message = require('./models/Message')
const router = express.Router()

router.post('/Chat', async (req, res) => {
    try{
        const ChatRoom = new Chat({
            User1: req.session._id,
            User2: req.query._id
        })
        const savedChat = await ChatRoom.save()
        console.log("trying to post after save", savedChat)
        res.json(savedChat)
    }catch(err){
        res.json({ message: err })
        console.log(err)
    }
})

router.get('/getChat', async (req, res) => {
    try{
        var ChatRoom = await Chat.findOne({User1: req.session._id, User2: req.query._id})
        if(ChatRoom ===null){
            ChatRoom = await Chat.findOne({User1: req.query._id, User2: req.session._id})
        }
        res.json(ChatRoom)
    }catch(err){
        res.json({ message: err })
    }
})

router.post('/sendMessage', async (req, res) => {
    try{
        const message = new Message({
            roomId: req.query.roomId,
            userId: req.session._id,
            body: req.query.body,
            userName: req.query.userName
        })
        const savedmessage = await message.save()
        res.json(savedmessage)
    }catch(err){
        res.json({ message: err })
        console.log(err)
    }
})

router.get('/getMessages', async(req, res) => {
    try{
        var message = await Message.find({roomId: req.query._id})
        res.json(message)
    }catch(err){
        res.json({ message: err })
    }
})

module.exports = router