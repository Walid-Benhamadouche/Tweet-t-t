import axio from "axios"

export default {
    async getUsers(){
        let user = await axio.get("http://localhost:5000/test");
        console.log(user.data);
        return user.data
    }
}