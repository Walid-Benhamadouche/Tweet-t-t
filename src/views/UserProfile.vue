<template>
  <div class="user-profile">
    <div class="user-profile__userpanel">
        <div class="bg-image">
        </div>
        <h1 class="user-profile__username">@{{user.UserLoaded.UserName}}
          <div v-if="user.UserLoaded.IsAdmin" class="user-profile__admin">
            Admin
          </div>
        </h1>
        <div class="user-profile__follower-count">
            <strong>Following: {{state.following.length}}</strong> <strong>Followers: {{state.followers.length}}</strong>
            <button v-if="!userProfile.test && !state.followState" @click="followF">Follow</button>
            <button v-if="!userProfile.test && state.followState" @click="unfollowF">Unfollow</button>
        </div>
        <button v-if="!userProfile.test" @click="sendMessage">Send Message</button>
        
    </div>
    <div class="user-profile__tweet-wrapper">
      <CreatTweetPanel v-if="userProfile.test" @addTweet="addTweet"></CreatTweetPanel>
      <strong v-if="state.tweets.length === 0">no tweets posted yet</strong>
      <TweetItem class="user-profile__tweet" 
      v-for="tweet in state.tweets" 
      :key="tweet._id" 
      :username="user.UserLoaded.UserName" 
      :tweet="tweet.Body" 
      :userId="tweet.UserId"
      />
    </div>
    
  </div>
</template>

<script>
import { onMounted, reactive, computed, createApp } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import UserService from '../services/UserService'
import TweetItem from "../components/TweetItem";
import CreatTweetPanel from "../components/CreateTweetPanel";
import chat from '../components/ChatBox'

export default {
  name: 'UserProfile',
  components: { TweetItem, CreatTweetPanel },
  setup(props, ctx) {
    const userProfile = reactive({
      test: null
    })
    const store = useStore()
    const user = reactive({
      UserLoaded: {UserName: ''}
    })
    const userProfileId = computed(() => store.state.User.user._id)
    const userProfileName = computed(() => store.state.User.user.UserName)
    const route = useRoute()
    const userId = computed(() => route.params.userId)
    const state = reactive({
      room: '',
      followers: [],
      following: [],
      followState: false,
      tweets: []/*{
        _id: '',
        UserId: '',
        Body: ''
      } */
    })

    onMounted(async () => {
      if(userProfileId.value === userId.value) {
        userProfile.test = true
        user.UserLoaded = store.state.User.user
      }
      else {
        userProfile.test = false
        user.UserLoaded = await UserService.getUserId({_id: userId.value})
      }
      //get all this users tweets
      let temp = userId.value

      UserService.getFollower({_id: temp})
      .then(followerss => {
        for (let frs of followerss){
          if (frs.Follower === userProfileId.value) state.followState = true
          state.followers.unshift(frs.Follower)
        }
      })

      UserService.getFollowing({_id: temp})
      .then(followingss => {
        for (let flns of followingss){
          state.following.unshift(flns.Following)
        }
      })

      UserService.getTweets({UserIdT: temp})
      .then(tweetss => {
        for (let tt of tweetss){
          state.tweets.unshift({_id: tt._id, UserId: tt.UserId, Body: tt.Body})
        }
      })
    })

    function followF(){
      UserService.follow({
        userId: userId.value
      }).then(follow => {
        state.followState = true
        state.followers.unshift(follow.Follower)
      })
    }

    function unfollowF(){
      UserService.unFollow({
        _id: userId.value
      }).then(() => {
        state.followState = false
        var index = state.followers.indexOf(userProfileId.value);
        if (index > -1) {
            state.followers.splice(index, 1);
         }
      })
    }

    function addTweet(tweetBody) {
      //call api here to add a new tweet
      UserService.Tweet({
        UserIdT: user.UserLoaded._id,
        Body: tweetBody,
        UserName: user.UserLoaded.UserName
      }).then(tweet => {
        state.tweets.unshift({_id: tweet._id, UserId: tweet.UserId, Body: tweet.Body})
      })
    }

    async function sendMessage(){
      await UserService.getChatRoom({_id: userId.value
      }).then(async (room) => {
        if(room === null){
          await UserService.makeChatRoom({_id: userId.value
          }).then( maderoom => {
            state.room = maderoom._id
          })
        }
        else state.room = room._id
        console.log("room id: ",state.room)
        var instance = createApp(chat, {
              chatName: user.UserLoaded.UserName,
              ProfileName: userProfileName,
              chatId: state.room,
              senderId: userProfileId.value,
              receiverId: userId.value
            })
        ctx.emit('openChat', instance)
      })
    }

    return {
      user,
      userProfile,
      state,
      addTweet,
      userId,
      followF,
      unfollowF,
      sendMessage
    }

  },
}
</script>

<style lang="scss" scoped>
.user-profile {
    
    .bg-image{
      
    }
    .user-profile__userpanel {
        text-align: center;
        display: flex;
        height: 300px;
        width: 100%;
        flex-direction: column;
        //background-image: url("../assets/40449348_p0_master1200.jpg");
        //background-repeat: no-repeat;
        //background-position: center;
        //background-size: cover;
        background-color: #636e72;
        border: 1px solid #636e72;
        color: white;

        h1{
            margin: 0;
        }

        .user-profile__admin {
            color: white;
            border-radius: 5px;
            margin-top: 15px;
            margin-right: auto;
            padding:  0 10px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        
    }

    .user-profile__tweet-wrapper {
      background-color: #16191a;
      width: 100%;
      padding: 50px 5%;
      display: grid;
    }
}
</style>