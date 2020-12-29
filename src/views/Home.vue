<template>
  <div class="home">
    <h1>Home</h1>
    <div class="users-list">
      <router-link v-for="user in users" :to="{ name: 'UserProfile', params: { userId: user.id}}" :key="user.id">
        {{user.userName}}
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
//import {users} from '../assets/users'
//import UserService from "../services/UserService"

export default {
  name: 'Home',
  setup(){
    const users = ref([])
    onMounted(() => {
      //checkUser();
      //getUsers();
    })

    /*async function getUsers(){
      UserService.getUsers()
      .then(us => {
        users.value = us
      })
    }*/

    return {
      users,
    }
  }
}
</script>
<style lang="scss" scoped>
  .home {
    padding: 50px 5%;
  }
  .users-list{
    display: flex;
    flex-direction: column;
  }
</style>