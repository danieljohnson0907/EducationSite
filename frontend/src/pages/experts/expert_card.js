import React, { useState } from 'react';
import {
    Card,
    Button,
    Space,
    Input,
    notification,
    Avatar,
    Rate
} from 'antd';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Modal from '../../components/Modal';
import TextArea from 'antd/lib/input/TextArea';
import { sendOrder } from '../../redux/actions/messagesAction';
import { getAvatarUrl } from '../../utils/global';

function ExpertCard(props) {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isMoreModal, setIsMoreModal] = useState(false);

    const [orderForm, setOrderForm] = useState({
        budget: 0,
        message: '',
        sender_email: props.auth.user?.email,
        receiver_email: props.data.email,
        file: {}
    });

    function onSend() {

        if (orderForm.message === '') {
            notification.error({
                description: 'Please input the text about order'
            });
            return;
        }

        if (!props.auth.isAuthenticated) {
            notification.error({
                description: 'Please login'
            });
            return;
        }

        props.sendOrder(orderForm);

        setOrderForm({
            ...orderForm,
            message: ''
        });

        setIsOpenModal(false);
    }

    const avatarUrl = getAvatarUrl(props.data);

    return (
        <>
            {/* HIRE MODAL */}

            <Modal
                isOpen={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
            >

                <div style={{ width: 350 }}>

                    <Space
                        direction="vertical"
                        style={{ width: '100%' }}
                    >

                        <Input
                            type="number"
                            placeholder="Budget"
                            value={orderForm.budget}
                            onChange={(e) => {
                                setOrderForm({
                                    ...orderForm,
                                    budget: e.target.value
                                });
                            }}
                        />

                        <TextArea
                            rows={5}
                            placeholder="Tell the expert about your project..."
                            value={orderForm.message}
                            onChange={(e) => {
                                setOrderForm({
                                    ...orderForm,
                                    message: e.target.value
                                });
                            }}
                        />

                        <Button
                            type="primary"
                            onClick={onSend}
                            style={{
                                background: '#FF6B35',
                                borderColor: '#FF6B35'
                            }}
                        >
                            Send Request
                        </Button>

                    </Space>

                </div>

            </Modal>

            {/* PROFILE MODAL */}

            <Modal
                isOpen={isMoreModal}
                onCancel={() => setIsMoreModal(false)}
            >

                <div style={{ width: 350 }}>

                    <Space
                        direction="vertical"
                        size="middle"
                        style={{ width: '100%' }}
                    >

                        <h2>{props.data.name}</h2>

                        <div>
                            <strong>Email:</strong> {props.data.email}
                        </div>

                        <div>
                            <strong>Gender:</strong> {props.data.gender}
                        </div>

                        <div>
                            <strong>Subject:</strong>{' '}
                            {props.data.blog_name || 'General'}
                        </div>

                        <div>
                            <strong>Completed Orders:</strong>{' '}
                            {props.data.completed}
                        </div>

                        <div>
                            <strong>Orders In Progress:</strong>{' '}
                            {props.data.accepted}
                        </div>

                    </Space>

                </div>

            </Modal>

            {/* CARD */}

            <Card
                hoverable
                style={{
                    borderRadius: '18px',
                    border: 'none',
                    boxShadow: '0 8px 25px rgba(0,0,0,.08)',
                    textAlign: 'center',
                    height: '100%'
                }}
            >

                {/* AVATAR */}

                <Avatar
                    size={110}
                    src={avatarUrl}
                />

                {/* NAME */}

                <h3
                    style={{
                        marginTop: 18,
                        marginBottom: 5,
                        color: '#1A1F36',
                        fontWeight: 700
                    }}
                >
                    {props.data.name}
                </h3>

                {/* SUBJECT */}

                <div
                    style={{
                        color: '#64748b',
                        marginBottom: 12
                    }}
                >
                    {props.data.blog_name || 'General Subject'}
                </div>

                {/* RATING */}

                <div
                    style={{
                        marginBottom: 20
                    }}
                >
                    {/* <Rate
                        disabled
                        defaultValue={4.8}
                        style={{
                            fontSize: 14
                        }}
                    /> */}
                    <div
                        style={{
                            fontSize: 12,
                            color: '#94A3B8',
                            marginTop: 5
                        }}
                    >
                        ( Orders in Progress: {props.data.accepted || 0}) 
                    </div>

                    <div
                        style={{
                            fontSize: 12,
                            color: '#94A3B8',
                            marginTop: 5
                        }}
                    >
                        (Completed Orders: {props.data.completed || 10})
                    </div>

                </div>

                {/* BUTTONS */}

                <Space
                    direction="vertical"
                    style={{
                        width: '100%'
                    }}
                >

                    <Button
                        block
                        type="primary"
                        size="large"
                        style={{
                            background: '#0F172A',
                            border: 'none',
                            borderRadius: '10px'
                        }}
                        onClick={() => {
                            setIsMoreModal(true);
                        }}
                    >
                        View Profile
                    </Button>

                    <Button
                        block
                        size="large"
                        style={{
                            borderRadius: '10px',
                            borderColor: '#FF6B35',
                            color: '#FF6B35'
                        }}
                        onClick={() => {

                            setOrderForm({
                                ...orderForm,
                                receiver_email: props.data.email
                            });

                            setIsOpenModal(true);

                        }}
                    >
                        Hire Expert
                    </Button>

                </Space>

            </Card>

        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {
        sendOrder
    }
)(withRouter(ExpertCard));