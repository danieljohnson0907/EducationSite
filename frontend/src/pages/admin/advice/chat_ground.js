import React, { useState, useEffect } from 'react';
import TextArea from 'antd/lib/input/TextArea';
import { Button, Space } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { SendOutlined } from '@ant-design/icons';
import { sendAdminAdvice } from '../../../redux/actions/admin/adviceActions';
import Text from '../../../components/Text';
function ChatGround(props) {
    const [height, setHeight] = useState(0);
    const [messageText, setMessageText] = useState("");
    const [isAltPressed, setIsAltPressed] = useState(false);

    useEffect(() => {
        setHeight(window.screen.height - 400);
    }, [])

    function handleMessageSend() {
        props.sendAdminAdvice(props.auth.user.email, props.selectedEmail, messageText);
        setMessageText("");
    }
    return (
        props.selectedEmail === "" ?
        <div align="center">
            <Text 
                text="Select the user who you want to chat."
                size="20px"
            />
        </div> :
        <div style={{
            display: "flex", 
            gap: "15px", 
            flexDirection: "column",
            width: "100%",
            justifyContent: 'space-between',
            padding: "15px"
        }}>
            <div
                id="chatground_advice"
            >
                <Space
                    size="large"
                    direction="vertical"
                    style={{
                        width: "100%"
                    }}
                >
                    {
                        props.admin_advice.messages.map((item) => 
                            <div
                                align={item.sender_email === props.auth.user.email ? "right" : "left"}
                            >
                                <span style={{
                                    background: item.sender_email === props.auth.user.email ? "#d9d9fa" : "#aefaeb",
                                    padding: "8px",
                                    borderRadius: "5px"
                                }}>
                                    {item.message}
                                </span>
                            </div>
                        )        
                    }
                </Space>
            </div>
            <div style={{marginTop: "15px"}}>
                <TextArea
                    value={messageText}
                    onChange={(e) => {
                        setMessageText(e.target.value)
                    }}
                    onKeyUp = {(e) => {
                        if(e.keyCode === 13 && !isAltPressed) {
                            handleMessageSend();
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
                <div align="right" style={{ paddingTop: "15px" }}>
                    <Button icon={<SendOutlined />} type="primary"
                        onClick={() => {
                            handleMessageSend()
                        }}
                    >Send</Button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    admin_advice: state.admin_advice
})

export default connect(mapStateToProps, {
    sendAdminAdvice
})(withRouter(ChatGround));