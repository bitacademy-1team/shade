import React from 'react';
import {Divider} from "@material-ui/core";

const ChatMessage = ({chatMessages,currentUser}) => {

    const renderMessage = (chatData) => {
        const {msg,nickname,currentTime} = chatData;
        const messageFromMe = currentUser === chatData.nickname;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
        return (
            <li className={className}>
                <div className="Message-content">
                    <div className="username">
                        {nickname}
                    </div>
                    <div className="text">{msg}</div>
                    <div className="timetext">{currentTime}</div>
                </div>
            </li>
        );
    };

    
    return (
        <div>
            <ul className="messages-list">
                {chatMessages.map((chatMessages, index) =>
                    <div key={index}>
                        {renderMessage(chatMessages)}
                    </div>
                )}
            </ul>
            <Divider/>
        </div>
        
    );
};

export default ChatMessage;
