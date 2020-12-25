<template>
  <div class="user-profile">
    <div class="user-profile__userpanel">
        <h1 class="user-profile__username">@{{state.user.userName}}</h1>
        <div v-if="state.user.isAdmin" class="user-profile__admin">
            Admin
        </div>
        <div class="user-profile__follower-count">
            <strong>Followers: </strong> {{state.followers}}
        </div>
        <CreatTweetPanel @addTweet="addTweet"></CreatTweetPanel>
    </div>
    <div class="user-profile__tweet-wrapper">
      <TweetItem class="user-profile__tweet" 
      v-for="tweet in state.user.tweets" 
      :key="tweet.id" 
      :username="state.user.userName" 
      :tweet="tweet" 
      />
    </div>
    
  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { users } from '../assets/users';
import TweetItem from "../components/TweetItem";
import CreatTweetPanel from "../components/CreateTweetPanel";

export default {
  name: 'UserProfile',
  components: { TweetItem, CreatTweetPanel },
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId)
    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0]
    })

    function addTweet(tweet) {
      state.user.tweets.unshift({ id: state.user.tweets.length + 1, content: tweet })
    }
    
    return {
      state,
      addTweet,
      userId
    }

  },
}
</script>

<style lang="scss" scoped>
.user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    width: 100%;
    padding: 50px 5%;

    .user-profile__userpanel {
        display: flex;
        flex-direction: column;
        margin-right: 50px;
        padding: 20px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid #DFE3E9;

        h1{
            margin: 0;
        }

        .user-profile__admin {
            background: rebeccapurple;
            color: white;
            border-radius: 5px;
            margin-right: auto;
            padding:  0 10px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        
    }

    .user-profile__tweet-wrapper {
        display: grid;
    }
}
</style>