import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import axios from "axios";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { ACCESS_TOKEN } from "../../../service/oauth2/OAuth";
import ForumIcon from "@material-ui/icons/Forum";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Drawer, CssBaseline, Divider, IconButton } from "@material-ui/core";

const drawerWidth = "30%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: theme.shadows[5],
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  message: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(2),
  },
}));

const ChatRoom = (props) => {
  const stompClient = useRef({});
  const [connected, setConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [publicMessage, setPublicMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let token = localStorage.getItem(ACCESS_TOKEN);

  const connect = () => {
    stompClient.current = new StompJs.Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/stomp"),
      connectHeaders: {
        Authorization: token,
        "Content-Type": "applicationType/json",
      },
      debug: (debug) => {
        console.log("debug:::::::::: ", debug);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        subscribe();
      },
      onStompError: (err) => {
        console.error(err);
        console.error("Broker reported error: " + err.headers["message"]);
        console.error("Additional details: " + err.body);
      },
    });

    stompClient.current.activate();
    console.log("Socket Connetion");
  };

  const disconnect = () => {
    if (stompClient == null) {
      stompClient.current.deactivate();
    }
    setConnected(false);
    console.log("Disconnected");
  };

  const subscribe = () => {
    stompClient.current.subscribe("/topic/{roomid}", (res) => {
      console.log("subscribe: ", res.body);
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
      const payLoad = {
        roomid: "001",
        id: userId,
        nickname: nickname,
        msg: publicMessage,
      };
      console.log("publicPublish:::: ");
      stompClient.current.publish({
        destination: "/message",
        body: JSON.stringify(payLoad),
      });
      setPublicMessage("");
    }
    return true;
  };

  const userInfo = () => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/user/google",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "applicationType/json",
      },
    }).then((res) => {
      //   console.log("info-data: ", res)
      setUserId(res.data.id);
      setNickname(res.data.nickname);
      setConnected(true);
    });
  };

  useEffect(() => {
    connect();
    userInfo();

    return () => disconnect();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.message}>
        <IconButton
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
        >
          <ForumIcon fontSize="large" color="secondary" />
        </IconButton>
      </div>
      {/* <main
            className={clsx(classes.content, {
                [classes.contentShift]: open
            })}
            >
            <div className={classes.drawerHeader} />
            </main> */}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <div className="message-chat">
          <h1>채팅 목록</h1>
          <div>
            <ChatMessage chatMessages={chatMessages} currentUser={nickname} />
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
      </Drawer>
    </div>
  );
};

export default ChatRoom;
