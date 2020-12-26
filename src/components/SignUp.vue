<template>
    <h1><strong>Sign Up</strong></h1>
    <form action="" class="signUp" @submit.prevent="userData.createUser">
        <label for="email">E-mail</label>
        <input id="email" type="text" v-model="userData.email"/>
        <label for="password">Password</label>
        <input id="password" type="text" v-model="userData.password"/>
        <label for="confirmpassword">Confirm password</label>
        <input id="confirmpassword" type="text" v-model="userData.confpassword"/>
        <label for="username">Username</label>
        <input id="username" type="text" v-model="userData.username"/>
        <label for="firsname">Firsname</label>
        <input id="firsname" type="text" v-model="userData.firstname"/>
        <label for="lastname">Lastname</label>
        <input id="lastname" type="text" v-model="userData.lastname"/>
    </form>
    <button>
        Sign Up
    </button>
</template>

<script>
import { reactive } from 'vue'

export default {
    name: "SignUp",
    setup(){
        const userData = reactive({
            email: '',
            password: '',
            confpassword: '',
            username: '',
            firstname: '',
            lastname: ''
        })

        function createUser(){
            if(userData.password === userData.confpassword
            && userData.email !='' && userData.password != '' && userData.username != ''
            && userData.firstname !='' && userData.lastname !=''){
                console.log("signup")
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