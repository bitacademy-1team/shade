import React, { useEffect, useRef, useState } from 'react';
import "./Chat.css"
import axios from "axios";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { ACCESS_TOKEN } from "../../service/oauth2/OAuth";


const ChatRoom = (props) => {

    
    const stompClient = useRef({});
    const [connected, setConnected] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [publicMessage, setPublicMessage] = useState("");
    const [nickname, setNickname] = useState("");
    const [userId, setUserId] = useState("");

    let token = localStorage.getItem(ACCESS_TOKEN)

    const connect = () => {
        stompClient.current =  new StompJs.Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/stomp"),
            connectHeaders: {      
                'Authorization': token,
                'Content-Type': 'applicationType/json',
            },
            debug: (debug) => {
                console.log("debug:::::::::: ",debug);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                subscribe();
            },
            onStompError: (err) => {
                console.error(err);
                console.error('Broker reported error: ' + err.headers['message']);
                console.error('Additional details: ' + err.body);
            },
        });
        
        stompClient.current.activate();
        console.log("Socket Connetion");
    }

    const disconnect = () => {
        if(stompClient == null){
            stompClient.current.deactivate();
        }
        setConnected(false);
        console.log("Disconnected")
    }

    const subscribe = () => {
        stompClient.current.subscribe('/topic/{roomid}'
        , (res) => {
            console.log("subscribe: ", res.body)
            const payload = JSON.parse(res.body);
            setChatMessages((chatMessages) => [...chatMessages, payload]);
        });
    };  

    const publicPublish = (publicMessage) => {
        if (!stompClient.current.connected) {
            alert("Broker disconnected, can't send message.");
            return false;
        }
        if (publicMessage.length > 0) {
            const payLoad = { roomid: '001', id: userId, nickname: nickname, msg: publicMessage};
            console.log("publicPublish:::: ")
            stompClient.current.publish({
                destination: "/message",
                body: JSON.stringify(payLoad),
                
        })
        setPublicMessage("");
    }
    return true;
    }    


const userInfo = () => {
  axios({
    method: 'GET',
    url: 'http://localhost:8080/api/user/google',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'applicationType/json'
    }
  })
  .then((res)=>{
    //   console.log("info-data: ", res)
      setUserId(res.data.id);
      setNickname(res.data.nickname);
      setConnected(true);
  })
}

    useEffect(() => {
        connect();
        userInfo();

        return () => disconnect();
    },[])

    return (
        <div className="message-chat">
            <h1>채팅 목록</h1>
            <div>
                <ChatMessage
                    chatMessages={chatMessages}
                    currentUser={nickname}
                />                
            </div>
               
            {connected ? (
                 <ChatInput onSendMessage={publicPublish} />
            ) : (
                <div className="message-input">
                    <div className="inputField">
                        <span>로그인 하시면 채팅 입력이 가능합니다.</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatRoom;