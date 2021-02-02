import axio from "axios"

axio.defaults.withCredentials = true
const baseURL = process.env.baseURL || "http://localhost:5000"
export default {
    async auth(){
        let auth = await axio.get(baseURL+"/users/auth")
        console.log(auth.data.loggedIn)
        return auth.data
    },
    async getUser(){
        let user = await axio.get(baseURL+"/users/getUser");
        return user.data
    },
    async getUserId(data){
        console.log("this is the sent data", data)
        let user = await axio.get(baseURL+"/users/getUserId", {params: data});
        return user.data
    },
    async logIn(data){
        console.log(data)
        let user = await axio.get(baseURL+"/users/login", {params: data});
        console.log(user.data)
        return user.data
    },
    async signUp(data){
        let user = await axio.post(baseURL+"/users/signup", null, {params: data});
        return user.data
    },
    async Tweet(data){
        let tweet = await axio.post(baseURL+"/tweet/tweet", null, {params: data})
        return tweet.data
    },
    async getTweets(data){
        let tweets = await axio.get(baseURL+"/tweet/getTweets", {params: data})
        return tweets.data
    },
    async follow(data){
        let follow = await axio.post(baseURL+"/follow/follow", null, {params: data})
        return follow.data
    },
    async getFollowing(data){
        let following = await axio.get(baseURL+"/follow/getFollowings", {params: data})
        return following.data
    },
    async getFollower(data){
        let follower = await axio.get(baseURL+"/follow/getFollowers", {params: data})
        return follower.data
    },
    async unFollow(data){
        let unfollow = await axio.delete(baseURL+"/follow/unfollow", {params: data})
        console.log(unfollow.data)
        return unfollow.data
    },
    async makeChatRoom(data){
        let room = await axio.post(baseURL+"/chat/Chat", null, {params: data})
        return room.data
    },
    async getChatRoom(data){
        let room = await axio.get(baseURL+"/chat/getChat", {params: data})
        return room.data
    },
    async getMessages(data){
        let messages = await axio.get(baseURL+"/chat/getMessages", {params: data})
        return messages.data
    },
    async sendMessage(data){
        let message = await axio.post(baseURL+"/chat/sendMessage", null, {params: data})
        return message.data
    },
    async updateCover(data){
        let user = await axio.put(baseURL+"/users/update", {data})
        return user.data
    }
}