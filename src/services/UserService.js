import axio from "axios"

export default {
    async getUsers(){
        let user = await axio.get("http://localhost:5000/test");
        console.log(user.data);
        return user.data
    },
    async logIn(data){
        console.log(data)
        let user = await axio.get("http://localhost:5000/users/login", {params: data });
        return user.data
    },
    async signUp(data){
        let user = await axio.post("http://localhost:5000/users/signup",null ,{params: data});
        return user.data
    }
}