import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from './chatmodal';
import TextArea from 'antd/lib/input/TextArea';
import {
initialSocket,
sendUserAdvice
} from '../redux/actions/adviceActions';

import './ChatWidget.css';

function ChatWidget(props) {

const [isOpenModal, setIsOpenModal] = useState(false);

useEffect(() => {
    props.initialSocket(props.auth.user?.email);
}, []);

useEffect(() => {
    props.initialSocket(props.auth.user?.email);
}, [props.auth]);

return (
    <>
        <Modal
            isOpen={isOpenModal}
            onCancel={() => setIsOpenModal(false)}
        >
            <ChatUI
                sendUserAdvice={props.sendUserAdvice}
                auth={props.auth}
                messages={props.user_advice.messages}
            />
        </Modal>

        {
            props.auth.user?.role === 1 && (
                <div className="chat-widgets">

                    <div
                        className="chat-fab"
                        onClick={() => setIsOpenModal(true)}
                    >
                        GM
                    </div>

                </div>
            )
        }
    </>
);

}

export function ChatUI(props) {

const [messageText, setMessageText] = useState("");
const [isAltPressed, setIsAltPressed] = useState(false);

function handleMessageSend() {

    if (!messageText.trim()) {
        return;
    }

    props.sendUserAdvice({
        email: props.auth.user.email,
        message: messageText
    });

    setMessageText("");
}

useEffect(() => {

    const chatground =
        document.getElementById('chatground');

    if (chatground) {
        chatground.scrollTop =
            chatground.scrollHeight;
    }

}, [props.messages]);

return (

    <div className="chat-container">

        <div className="chat-header">

            <div className="chat-logo">
                GM
            </div>

            <div className="chat-header-info">

                <div className="chat-title">
                    Study Assistant
                </div>

                <div className="chat-status">
                    ● Online Now
                </div>

            </div>

        </div>

        <div
            id="chatground"
            className="chat-body"
        >

            {
                props.messages &&
                props.messages.map((item, index) => {

                    const isMine =
                        item.sender_email ===
                        props.auth.user.email;

                    return (

                        <div
                            key={index}
                            className={
                                isMine
                                    ? "message-row sent-row"
                                    : "message-row received-row"
                            }
                        >

                            <div
                                className={
                                    isMine
                                        ? "message-bubble sent"
                                        : "message-bubble received"
                                }
                            >
                                {item.message}
                            </div>

                        </div>
                    );
                })
            }

        </div>

        <div className="chat-footer">

            <TextArea
                value={messageText}
                autoSize={{
                    minRows: 2,
                    maxRows: 4
                }}
                placeholder="Type your message..."
                onChange={(e) => {
                    setMessageText(e.target.value);
                }}
                onKeyUp={(e) => {

                    if (
                        e.keyCode === 13 &&
                        !isAltPressed
                    ) {
                        handleMessageSend();
                    }

                    if (e.keyCode === 18) {
                        setIsAltPressed(false);
                    }
                }}
                onKeyDown={(e) => {

                    if (e.keyCode === 18) {
                        setIsAltPressed(true);
                    }
                }}
            />

            <Button
                shape="circle"
                size="large"
                className="send-btn"
                icon={<SendOutlined />}
                onClick={handleMessageSend}
            />

        </div>

    </div>
);

}

const mapStateToProps = (state) => ({
auth: state.auth,
user_advice: state.user_advice
});

export default connect(
mapStateToProps,
{
initialSocket,
sendUserAdvice
}
)(withRouter(ChatWidget));