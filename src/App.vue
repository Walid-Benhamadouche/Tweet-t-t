<template>
  <div id="app">
    <nav>
      <router-link to="/">
        <div class="navigation__logo">
          Tweet-t-t
        </div>
      </router-link>
      <router-link class="navigation__user" v-if="user" :to="{ name: 'UserProfile', params: { userId: user._id }}">
        {{user.UserName}}
      </router-link>
    </nav>
    <router-view @openChat="openChat"/>
  </div>
</template>

<script> 
import { useStore } from 'vuex';
import { computed, /*createApp*/ } from 'vue'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const user = computed(() => store.state.User.user)

    function openChat(instance){
      let app = document.getElementById("app")
      const div = document.createElement('div')
      app.appendChild(div)
      instance.mount(div)
    }

    return {
      user,
      openChat
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 10hv;
  background-color: #F3F5FA;
  height: 100%;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5%;
    background-color: indigo;
    color: white;

    .navigation__logo {
      font-weight: bold;
      font-size: 24px;
    }
    .navigation__user {
      font-weight: bold;
    }

  }

}
</style>
