import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import ChatGround from './chat-ground';
import { Col, Row, notification } from 'antd';
import Sidebar from './sidebar';
import Information from './information';
import { initialSocket } from '../../redux/actions/messagesAction';
function Message(props) {
  const [height, setHeight] = useState(0);
  const [information, setInformation] = useState({
    name: '',
    birthday: "",
    gender: 'woman',
    message: '',
    order_id: "",
    status: 0,
    budget: 0,
    unread_count: 4,
  })
  const [selectedEmail, setSelectedEmail] = useState("");

  useEffect(() => {
    if(!props.auth.isAuthenticated){
      notification.error({
        description: "Please login"
      });
      window.location.href="/";
    } else {
      props.initialSocket(props.auth.user.email)
    }
  }, [])

  useEffect(() => {
    if(selectedEmail !== "") {
      props.messages.users.map((item) => {
        if(item.email === selectedEmail) {
          setInformation(item);    
        }
      })
    }
  }, [selectedEmail, props.messages.users])
  return (
    <>
      <div style={{display: "flex", gap: "15px", flexDirection: "column", height: "100%"}}>
        <Row style={{height: "100%"}}>
          <Col span={4} style={{height: "100%"}}>
            <Sidebar 
              selectedEmail={selectedEmail}
              setSelectedEmail={setSelectedEmail}
            />
          </Col>
          <Col span={16}>
            <ChatGround
              information={information} 
              selectedEmail={selectedEmail}
            />
          </Col>
          <Col span={4}>
            <Information 
              data = {information}
            />
          </Col>
        </Row>
        {/* <div style={{flex: 1}}>
          <ChatGround />
        </div>
        <ChatInput 
          handleSendMessage = {handleSendMessage}
        /> */}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  messages: state.messages
})

export default connect(mapStateToProps, { initialSocket })(withRouter(Message));