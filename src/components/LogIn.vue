<template>
    <h1><strong>Log In</strong></h1>
    <form action="" class="logIn" @submit.prevent="logInUser">
        <label for="email">E-mail</label>
        <input id="email" type="text" v-model="login.email"/>
        <label for="password">Password</label>
        <input id="password" type="text" v-model="login.password"/>
    </form>
    <button>
        Log In
    </button>
</template>

<script>
import { reactive } from 'vue'

export default {
    name: "LogIn",
    setup(){
        const login = reactive({
            email: '',
            password: ''
        })

        function logInUser(){
            if(login.email !='' && login.password !=''){
                console.log("login")
            }
        }

        return {
            login,
            logInUser
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