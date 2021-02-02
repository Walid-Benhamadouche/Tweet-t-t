import axio from "axios"

axio.defaults.withCredentials = true
export default {
    async auth(){
        let auth = await axio.get(process.env.BASE_URL+"/users/auth")
        console.log(auth.data.loggedIn)
        return auth.data
    },
    async getUser(){
        let user = await axio.get(process.env.BASE_URL+"/users/getUser");
        return user.data
    },
    async getUserId(data){
        console.log("this is the sent data", data)
        let user = await axio.get(process.env.BASE_URL+"/users/getUserId", {params: data});
        return user.data
    },
    async logIn(data){
        console.log(data)
        let user = await axio.get(process.env.BASE_URL+"/users/login", {params: data});
        console.log(user.data)
        return user.data
    },
    async signUp(data){
        let user = await axio.post(process.env.BASE_URL+"/users/signup", null, {params: data});
        return user.data
    },
    async Tweet(data){
        let tweet = await axio.post(process.env.BASE_URL+"/tweet/tweet", null, {params: data})
        return tweet.data
    },
    async getTweets(data){
        let tweets = await axio.get(process.env.BASE_URL+"/tweet/getTweets", {params: data})
        return tweets.data
    },
    async follow(data){
        let follow = await axio.post(process.env.BASE_URL+"/follow/follow", null, {params: data})
        return follow.data
    },
    async getFollowing(data){
        let following = await axio.get(process.env.BASE_URL+"/follow/getFollowings", {params: data})
        return following.data
    },
    async getFollower(data){
        let follower = await axio.get(process.env.BASE_URL+"/follow/getFollowers", {params: data})
        return follower.data
    },
    async unFollow(data){
        let unfollow = await axio.delete(process.env.BASE_URL+"/follow/unfollow", {params: data})
        console.log(unfollow.data)
        return unfollow.data
    },
    async makeChatRoom(data){
        let room = await axio.post(process.env.BASE_URL+"/chat/Chat", null, {params: data})
        return room.data
    },
    async getChatRoom(data){
        let room = await axio.get(process.env.BASE_URL+"/chat/getChat", {params: data})
        return room.data
    },
    async getMessages(data){
        let messages = await axio.get(process.env.BASE_URL+"/chat/getMessages", {params: data})
        return messages.data
    },
    async sendMessage(data){
        let message = await axio.post(process.env.BASE_URL+"/chat/sendMessage", null, {params: data})
        return message.data
    },
    async updateCover(data){
        let user = await axio.put(process.env.BASE_URL+"/users/update", {data})
        return user.data
    }
}