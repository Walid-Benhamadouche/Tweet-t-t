<template>
    <div class="tweet-item">
        <div class="user-profile__tweet">
            <router-link class="tweet-item__user" :to="{ name: 'UserProfile', params: { userId: userId }}">
                @{{username}}
             </router-link>
             <br>
             <br>
            <div class="tweet-item__content">
                {{tweet}}
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: "TweetItem",
    props: {
        username: {
            type: String,
            required: true
        },
        tweet: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            requires: true
        }
    },
}
</script>
<style lang="scss" scoped>
.tweet-item {
    padding: 20px;
    margin: 5px;
    width: 60%;
    background-color: #212627;
    border-radius: 10px;
    border: 1px solid #212627;
    box-sizing: border-box;
    transition: all 0.25s ease;
    color: white;

    .tweet-item__user {
        font-weight: bold;
    }
}
</style>