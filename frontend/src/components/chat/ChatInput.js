import React, { useState, useEffect, useRef } from 'react'
import TextField from '@material-ui/core/TextField';

const ChatInput = ({onSendMessage}) => {

    const scrollRef = useRef();
    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
    useEffect(() => {
        scrollToBottom();
    });

    const [text, setText] = useState("")

    let onChange = (e) => {
        setText(e.target.value)
    }

    let onSubmit = () => {
        setText("")
        onSendMessage(text);
    }

    const searchTag = () => {
        // testData.sort();
        // testData = testData.filter((res) => {
        //     res.name.includes(e.target.value)
        // })
    }

    const inputKeyEvent = (e) => {
        switch(true){
            case e.key === 'Enter' : 
                onSubmit(text)
                break;

            case e.key === '@' :
                alert("@@@")
                break;
                
            default :
            console.log("default")
        }
    }


    return (
          <div className="message-input">
                    <label htmlFor="message"></label>
                    <TextField
                        type="text"
                        className="inputField"
                        name="publicMessage"
                        value={text}
                        placeholder='공용 메시지를 입력하세요'
                        onChange={(e) => onChange(e)}
                        onKeyPress={(e) => inputKeyEvent(e)}
                    // onKeyPress={(e) => e.key === 'Enter' && publicPublish(publicMessage)}
                    />
                    <div>
                        {text.length > 0 ? (
                            <button onClick={() => onSubmit(text)}>전송</button>
                        ) : (
                            <button onClick={() => searchTag()}>#</button>
                        )}
                    </div>
                    <div ref={scrollRef}></div>
                </div>
    );
};

export default ChatInput;