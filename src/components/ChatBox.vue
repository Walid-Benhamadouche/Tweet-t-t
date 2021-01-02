<template>
    <div class="chat-box">
      <div class="chat-box__name-bar"><p>{{chatName}}</p></div>
      <ul class="chat-box__body">
          <li v-for="(message,index) in discussion.messages" :key="index">
            <p class="received" v-if="message.Mtype === 'received'">{{message.message}}</p>
          </li>
          <li v-for="(message,index) in discussion.messages" :key="index">
          <p class="sent" v-if="message.Mtype === 'sent'">{{message.message}}</p>
          </li>
      </ul>
      <div class="chat-box__send-message">
        <input id="messageToSend" type="text" class="chat-box__message" placeholder="write a message"/>
        <button class="chat-box__send" @click="sendMessage">Send</button>
      </div>
    </div>
</template>

<script>

import { watchEffect, onMounted, reactive } from 'vue'
import io from 'socket.io-client'
import UserService from '../services/UserService'

export default {
    props: {
        chatName: {
            type: String,
            required: true,
        },
        ProfileName: {
            type: String,
            required: true
        },
        chatId: {
            type: String,
            required: true
        },
        senderId: {
          type: String,
          required: true
        },
        receiverId: {
          type: String,
          required: true
          }
        },
    setup(props){
        const discussion = reactive({
            socket: '',
            messages: []
        })

        watchEffect(async () => {
          if(discussion.socket != ''){
            console.log("starting to listen !!!!")
            discussion.socket.on('message', async (message) => {
              console.log("message recieved in front end", message)
              let messageType = ''
              if(message.senderId === props.senderId) messageType = "sent"
              else messageType = "received"
              discussion.messages.push({message: message.text, time: message.date, userName: message.userName, Mtype: messageType})
          })
          }
          else console.log("waiting for socket io to init")
        })

        onMounted(async () => {
          discussion.socket = await io('ws://localhost:5000', { query: "userId="+props.senderId})
          console.log("what is this ?", discussion.socket)
          UserService.getMessages({
            _id: props.chatId
          }).then(message => {
            for (let msg of message){
              let messageType = ''
              if(msg.userId === props.senderId) messageType = "sent"
              else messageType = "received"
              discussion.messages.push({message: msg.body, time: msg.date, userName: msg.userName, Mtype: messageType})
            }
          })
          
        })

        function sendMessage(){
          let message = document.getElementById("messageToSend").value
          UserService.sendMessage({
            roomId: props.chatId,
            body: message,
            userName: props.ProfileName,
          }).then(message => {
            discussion.socket.emit('message', {text: message.body, receiverId: props.receiverId, date: message.date, senderId: props.senderId, userName: props.ProfileName})
            discussion.messages.push({message: message.body, time: message.date, userName: props.ProfileName, Mtype: "sent"})
            document.getElementById("messageToSend").value = ''
          })
        }
        return {
            discussion,
            sendMessage
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
            height: auto;
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
            height: auto;
            text-align: left;
            font: 400 .9em 'Open Sans', sans-serif;
            border: 1px solid #97C6E3;
            border-radius: 10px;
          }
      }
    }
</style>