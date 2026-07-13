import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './chatmodal.css';

function ChatModal(props) {

    const {
        isOpen,
        onCancel,
        children
    } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="chat-modal">

            <div
                className="chat-modal-shadow"
                onClick={onCancel}
            />

            <div className="chat-modal-body">

                <div className="chat-modal-container">

                    <div
                        className="chat-modal-close"
                        onClick={onCancel}
                    >
                        <CloseOutlined />
                    </div>

                    {children}

                </div>

            </div>

        </div>
    );
}

export default ChatModal;