import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react';
function ChatInput(props) {
    const [isAltPressed, setIsAltPressed] = useState(false);
    const [chatInput, setChatInput] = useState("");
  return (
    <>  
      <TextArea 
        value={chatInput}
        onChange={(e) => {
          setChatInput(e.target.value);
        }}
        onKeyUp = {(e) => {
            if(e.keyCode === 13 && !isAltPressed) {
                props.handleSendMessage(chatInput);
            }
            if(e.keyCode === 18) {
                setIsAltPressed(false);
            }
        }}
        onKeyDown = {(e) => {
            if(e.keyCode === 18) {
                setIsAltPressed(true);
            }
        }}
        
      />
      <div align="right">
        <Button type="primary"
          onClick={() => {
            props.handleSendMessage(chatInput);
          }}
        >
          Send
        </Button>  
      </div>
    </>
  )
}

export default ChatInput;