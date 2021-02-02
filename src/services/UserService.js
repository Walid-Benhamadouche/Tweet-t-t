import axio from "axios"

axio.defaults.withCredentials = true
export default {
    async auth(){
        let auth = await axio.get("https://vuejslearningapp.herokuapp.com/users/auth")
        console.log(auth.data.loggedIn)
        return auth.data
    },
    async getUser(){
        let user = await axio.get("https://vuejslearningapp.herokuapp.com/users/getUser");
        return user.data
    },
    async getUserId(data){
        console.log("this is the sent data", data)
        let user = await axio.get("https://vuejslearningapp.herokuapp.com/users/getUserId", {params: data});
        return user.data
    },
    async logIn(data){
        console.log(data)
        let user = await axio.get("https://vuejslearningapp.herokuapp.com/users/login", {params: data});
        console.log(user.data)
        return user.data
    },
    async signUp(data){
        let user = await axio.post("https://vuejslearningapp.herokuapp.com/users/signup", null, {params: data});
        return user.data
    },
    async Tweet(data){
        let tweet = await axio.post("https://vuejslearningapp.herokuapp.com/tweet/tweet", null, {params: data})
        return tweet.data
    },
    async getTweets(data){
        let tweets = await axio.get("https://vuejslearningapp.herokuapp.com/tweet/getTweets", {params: data})
        return tweets.data
    },
    async follow(data){
        let follow = await axio.post("https://vuejslearningapp.herokuapp.com/follow/follow", null, {params: data})
        return follow.data
    },
    async getFollowing(data){
        let following = await axio.get("https://vuejslearningapp.herokuapp.com/follow/getFollowings", {params: data})
        return following.data
    },
    async getFollower(data){
        let follower = await axio.get("https://vuejslearningapp.herokuapp.com/follow/getFollowers", {params: data})
        return follower.data
    },
    async unFollow(data){
        let unfollow = await axio.delete("https://vuejslearningapp.herokuapp.com/follow/unfollow", {params: data})
        console.log(unfollow.data)
        return unfollow.data
    },
    async makeChatRoom(data){
        let room = await axio.post("https://vuejslearningapp.herokuapp.com/chat/Chat", null, {params: data})
        return room.data
    },
    async getChatRoom(data){
        let room = await axio.get("https://vuejslearningapp.herokuapp.com/chat/getChat", {params: data})
        return room.data
    },
    async getMessages(data){
        let messages = await axio.get("https://vuejslearningapp.herokuapp.com/chat/getMessages", {params: data})
        return messages.data
    },
    async sendMessage(data){
        let message = await axio.post("https://vuejslearningapp.herokuapp.com/chat/sendMessage", null, {params: data})
        return message.data
    },
    async updateCover(data){
        let user = await axio.put("https://vuejslearningapp.herokuapp.com/users/update", {data})
        return user.data
    }
}