import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { initialSocket } from '../../../redux/actions/admin/adviceActions';
import Sidebar from './sidebar';
import ChatGround from './chat_ground';
import { Col, Row } from 'antd';
function Advice(props) {
    const [selectedEmail, setSelectedEmail] = useState("");
    useEffect(() => {
        props.initialSocket(props.auth.user?.email);
    }, [])
    return (
        <Row>
            <Col md={{span: 6}}>
                <Sidebar 
                    selectedEmail={selectedEmail}
                    setSelectedEmail={setSelectedEmail}
                />
            </Col>
            <Col md={{span: 18}}>
                <ChatGround 
                    selectedEmail={selectedEmail}
                />
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user_advice: state.user_advice
})

export default connect(mapStateToProps, {
    initialSocket,
})(withRouter(Advice));