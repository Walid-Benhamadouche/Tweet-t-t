import axio from "axios"

axio.defaults.withCredentials = true
export default {
    async auth(){
        let auth = await axio.get("http://localhost:5000/users/auth")
        console.log(auth.data.loggedIn)
        return auth.data
    },
    async getUser(){
        let user = await axio.get("http://localhost:5000/users/getUser");
        return user.data
    },
    async getUserId(data){
        console.log("this is the sent data", data)
        let user = await axio.get("http://localhost:5000/users/getUserId", {params: data});
        return user.data
    },
    async logIn(data){
        console.log(data)
        let user = await axio.get("http://localhost:5000/users/login", {params: data});
        console.log(user.data)
        return user.data
    },
    async signUp(data){
        let user = await axio.post("http://localhost:5000/users/signup", null, {params: data});
        return user.data
    },
    async Tweet(data){
        let tweet = await axio.post("http://localhost:5000/tweet/tweet", null, {params: data})
        return tweet.data
    },
    async getTweets(data){
        let tweets = await axio.get("http://localhost:5000/tweet/getTweets", {params: data})
        return tweets.data
    }
}