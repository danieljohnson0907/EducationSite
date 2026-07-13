import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import './modal.css';

function Modal(props) {
    const {
        isOpen,
        onCancel,
        children
    } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div
                className="modal-shadow"
                onClick={onCancel}
            />

            <div className="modal-body">
                <div className="modal-container">

                    <div
                        className="modal-close"
                        onClick={onCancel}
                    >
                        <CloseCircleOutlined />
                    </div>

                    <div className="modal-content">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Modal;