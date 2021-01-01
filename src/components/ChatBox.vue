<template>
    <div class="chat-box">
      <div class="chat-box__name-bar"><p>{{chatName}}</p></div>
      <ul class="chat-box__body">
          <li v-for="(message,index) in discussion.messages" :key="index">
            <p class="received" v-if="message.Mtype === 'received'">{{message.messages}}</p>
          </li>
          <li v-for="(message,index) in discussion.messages" :key="index">
          <p class="sent" v-if="message.Mtype === 'sent'">{{message.messages}}</p>
          </li>
      </ul>
      <div class="chat-box__send-message">
        <input type="text" class="chat-box__message" placeholder="write a message"/>
        <button class="chat-box__send">Send</button>
      </div>
    </div>
</template>

<script>

import { onMounted, reactive } from 'vue'
//import io from 'socket.io'

export default {
    props: {
        chatName: {
            type: String,
            required: true
        }
        },
    setup(){
        const discussion = reactive({
            messages: [{
                messages: "first message",
                time: Date("20:30"),
                userName: "someone",
                Mtype: "sent"
            },
            {
                messages: "first second",
                time: Date("20:32"),
                userName: "someone",
                Mtype: "sent"
            },
            {
                messages: "first third",
                time: Date("20:34"),
                userName: "someone",
                Mtype: "sent"
            },
            {
                messages: "first message",
                time: Date("20:31"),
                userName: "someone_else",
                Mtype: "received"
            },
            {
                messages: "first second",
                time: Date("20:33"),
                userName: "someone_else",
                Mtype: "received"
            },
            {
                messages: "first third",
                time: Date("20:35"),
                userName: "someone_else",
                Mtype: "received"
            },
            {
                messages: "first message",
                time: Date("20:31"),
                userName: "someone_else",
                Mtype: "received"
            },
            {
                messages: "first second",
                time: Date("20:33"),
                userName: "someone_else",
                Mtype: "received"
            },
            {
                messages: "first third",
                time: Date("20:35"),
                userName: "someone_else",
                Mtype: "received"
            }]
        })

        onMounted(() => {
          //const socket = io('ws://localhost:5000/')
          //console.log("what is this ?", socket)
        })

        return {
            discussion
        }
    }
}
</script>

<style lang="scss" scoped>
.chat-box {
      margin: 0%;
      border: 0%;
      padding-left: 21%;
      padding-top: 30%;
      background-color: white;
      position: fixed;
      bottom: 0;
      right : 1%;

      .chat-box__name-bar {
        text-align: center;
        margin: 0;
        border: 0%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        border: 1.5px solid #DFE3E8;
        width: 100%;
        height: 14%;
        background-color: white;
        position: absolute;
        top: 0;
        right: 0;
      }

      .chat-box__send-message {
        text-align: center;
        margin: 0;
        border: 0%;
        border: 1.5px solid #DFE3E8;
        width: 100%;
        height: 12%;
        background-color: white;
        position: absolute;
        bottom: 0;
        right: 0;       

        .chat-box__message {
          border-radius: 20px;
          border: 1.5px solid #DFE3E8;
          height: 60%;
          width: 67%;
          background-color: azure;
          position: absolute;
          top: 16%;
          right: 16%
        }
        .chat-box__message:focus {
          outline: none;
        }

        .chat-box__send {
          width: 14%;
          position: absolute;
          top: 30%;
          right: 1%;
        }

      }
      .chat-box__body {
        margin: 0;
        border: 0%;
        width: 100%;
        height: 72.7%;
        border-left: 1.5px solid #DFE3E8;
        border-right: 1.5px solid #DFE3E8;
        border-bottom: 1.5px solid #DFE3E8;
        background-color: white;
        position: absolute;
        bottom: 12%;
        right: 0;
        list-style-type: none;
        padding: 0%;
        margin: 0%;
        overflow-y: auto;

          .sent {
            position: relative;
            margin-top: 5px;
            margin-bottom: 5px;
            margin-left: calc(100% - 190px);
            padding: 10px;
            background-color: #f8e896;
            width: 150px;
            height: 20px;
            text-align: left;
            font: 400 .9em 'Open Sans', sans-serif;
            border: 1px solid #dfd087;
            border-radius: 10px;
          }

          .received{
            position: relative;
            margin-left: 20px;
            margin-top: 5px;
            margin-bottom: 5px;
            padding: 10px;
            background-color: #A8DDFD;
            width: 150px;
            height: 20px;
            text-align: left;
            font: 400 .9em 'Open Sans', sans-serif;
            border: 1px solid #97C6E3;
            border-radius: 10px;
          }
      }
    }
</style>