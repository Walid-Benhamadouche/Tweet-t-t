<template>
  <form action="" class="user-profile__create-tweet" @submit.prevent="creatNewTweet" 
    :class="{'exceeded': newTweetCharacterCount > 180}">
        <label for="newtweet"><strong>New Tweet</strong> {{newTweetCharacterCount}}/180</label>
        <textarea id="newtweet" rows="4" v-model="state.newTweetContent"/>
        <div class="user-profile__createtweet-type">
            <label for="newTweetType"><strong>Type :</strong></label>
            <select id="newTweetType" v-model="state.selectedTweetType">
                <option :value="option.value" v-for="(option,index) in state.TweetTypes" :key="index">
                    {{option.name}}
                </option>
            </select>
        </div>
    <button>
        tweet-t-t
    </button>
  </form>
</template>

<script>
import { reactive,computed } from 'vue';

export default {
    name: "CreateTweetPanel",
    setup(props, ctx) {
        const state = reactive({
            newTweetContent: '',
            selectedTweetType: 'instant',
            TweetTypes: [
            {value: 'draft', name: 'Draft'},
            {value: 'instant', name: 'Instant'}
            ],
        })

        const newTweetCharacterCount = computed(()=> state.newTweetContent.length)

        function creatNewTweet() {
            if(state.newTweetContent && state.selectedTweetType!="draft") 
            {
                ctx.emit('addTweet', state.newTweetContent)
                state.newTweetContent = '';
            }
        }

        return {
            state,
            newTweetCharacterCount,
            creatNewTweet
        }
    },
}
</script>

<style lang="scss" scoped>
.user-profile__create-tweet {
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            padding: 20px;
            margin: 5px;
            width: 60%;
            background-color: #212627;
            border-radius: 10px;
            border: 1px solid #212627;
            box-sizing: border-box;
            transition: all 0.25s ease;
            color: white;

            button {
                border-radius: 20px;
                border: 1.5px solid #2d3436;
                height: 50px;
                width: 120px;
                background-color: #2d3436;
                color: white;
            }

            #newtweet {
                border-radius: 20px;
                border: 1.5px solid #2d3436;
                height: 60%;
                width: 100%;
                background-color:  #2d3436;
            }
            #newtweet {
                outline: none;
            }

            &.exceeded {
                color: red;
                button {
                    background-color: red;
                    border: none;
                    color: white;
                }
            }
        }
</style>