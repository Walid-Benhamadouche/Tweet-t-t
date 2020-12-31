<template>
  <div class="home">
    <h1>Home</h1>
    <div class="users-list">
      <strong v-if="state.tweets.length === 0">follow someone to see their tweet-t-ts</strong>
      <TweetItem class="user-profile__tweet" 
      v-for="tweet in state.tweets" 
      :key="tweet._id" 
      :username="tweet.UserName" 
      :tweet="tweet.Body" 
      :userId="tweet.UserId"
      />
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { useStore } from 'vuex';
import TweetItem from "../components/TweetItem";
import UserService from "../services/UserService"

export default {
  name: 'Home',
  components: { TweetItem },
  setup(){
    const store = useStore()
    const userProfileId = computed(() => store.state.User.user._id)
    const state = reactive({
      following: [],
      tweets: []/*{
        _id: '',
        UserId: '',
        Body: ''
      } */
    })
    onMounted(() => {

      UserService.getFollowing({_id: userProfileId.value})      
      .then(followingss => {
        for (let flns of followingss){
          state.following.unshift(flns.Following)
        }
        for (let temp of state.following){
        console.log("temp", temp)
        UserService.getTweets({UserIdT: temp})
        .then(tweetss => {
          for (let tt of tweetss){
            state.tweets.unshift({_id: tt._id, UserId: tt.UserId, Body: tt.Body, UserName: tt.UserName})
          }
        })
        }
      })
    })

    /*async function getUsers(){
      UserService.getUsers()
      .then(us => {
        users.value = us
      })
    }*/

    return {
      state,
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