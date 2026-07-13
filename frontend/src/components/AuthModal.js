import React from 'react';
import Login from './Login';
import Register from './Register';
import Modal from './Modal';

const AuthModal = ({
    isOpen,
    setIsOpen,
    onCancel,
    type
}) => {
    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onCancel={onCancel}
        >
            {type === 'login' ? (
                <Login onCancel={onCancel} />
            ) : (
                <Register onCancel={onCancel} />
            )}
        </Modal>
    );
};

export default AuthModal;