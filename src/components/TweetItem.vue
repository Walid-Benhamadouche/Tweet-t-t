<template>
    <div class="tweet-item">
        <div class="user-profile__tweet">
            <router-link class="tweet-item__user" :to="{ name: 'UserProfile', params: { userId: userId }}">
                @{{username}}
             </router-link>
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
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.25s ease;
    
    &:hover {
        transform: scale(1.1, 1.1);
    }

    .tweet-item__user {
        font-weight: bold;
    }
}
</style>