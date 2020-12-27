<template>
    <h1><strong>Sign Up</strong></h1>
    <form action="" class="signUp" @submit.prevent="createUser">
        <label for="email">E-mail</label>
        <input id="email" type="text" v-model="userData.Email"/>
        <label for="password">Password</label>
        <input id="password" type="text" v-model="userData.password"/>
        <label for="confirmpassword">Confirm password</label>
        <input id="confirmpassword" type="text" v-model="userData.confpassword"/>
        <label for="username">Username</label>
        <input id="username" type="text" v-model="userData.UserName"/>
        <label for="firsname">Firsname</label>
        <input id="firsname" type="text" v-model="userData.FirstName"/>
        <label for="lastname">Lastname</label>
        <input id="lastname" type="text" v-model="userData.LastName"/>
        <button>
            Sign Up
        </button>
    </form>
</template>

<script>
import { reactive } from 'vue'
import router from '../router/index'
import store from '../store/index'
import UserService from '../services/UserService'

export default {
    name: "SignUp",
    setup(){
        const userData = reactive({
            Email: '',
            Password: '',
            Confpassword: '',
            UserName: '',
            FirstName: '',
            LastName: ''
        })

        function createUser(){
            console.log("started")
            if(userData.password === userData.confpassword
            && userData.Email !='' && userData.password != '' && userData.UserName != ''
            && userData.FirstName !='' && userData.LastName !=''){
                console.log("passed check")
                UserService.signUp(userData)
                .then(user => {
                    console.log(user)
                    store.dispatch('User/setUser', user)
                    router.push("/")
                })
            }
        }

        return {
            userData,
            createUser
        }

    }
}
</script>

<style lang="scss" scoped>
.signUp{
    display: flex;
    flex-direction: column;
}
</style>