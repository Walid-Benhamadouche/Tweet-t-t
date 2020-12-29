<template>
    <h1><strong>Log In</strong></h1>
    <form action="" class="logIn" @submit.prevent="logInUser">
        <label for="emailLogIn">E-mail</label>
        <input id="emailLogIn" type="text" v-model="login.Email"/>
        <label for="passwordLogIn">Password</label>
        <input id="passwordLogIn" type="password" v-model="login.HashCode"/>
        <button>
            Log In
        </button>
    </form>
</template>

<script>
import { reactive } from 'vue'
import router from '../router/index'
import UserService from '../services/UserService'

export default {
    name: "LogIn",
    setup(){
        const login = reactive({
            Email: '',
            HashCode: ''
        })

        function logInUser(){
            if(login.Email !='' && login.HashCode !=''){
                console.log("calling log in")
                UserService.logIn(login)
                .then(user => {
                    console.log(user)
                    router.push("/")
                })
            }
        }

        return {
            login,
            logInUser,
        }
    }
}
</script>

<style lang="scss" scoped>
.logIn{
    display: flex;
    flex-direction: column;
}
</style>