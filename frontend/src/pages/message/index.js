import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, notification } from 'antd';

import ChatGround from './chat-ground';
import Sidebar from './sidebar';
import Information from './information';

import { initialSocket } from '../../redux/actions/messagesAction';


function Message(props) {

  const [information, setInformation] = useState({
    name: '',
    birthday: "",
    gender: 'woman',
    message: '',
    order_id: "",
    status: 0,
    budget: 0,
    unread_count: 0,
  });


  const [selectedEmail,setSelectedEmail] = useState("");

  const hasSelection = selectedEmail !== "";


  useEffect(()=>{

    if(!props.auth.isAuthenticated){

      notification.error({
        description:"Please login"
      });

      window.location.href="/";

    }else{

      props.initialSocket(
        props.auth.user.email
      );

    }

  },[]);



  useEffect(()=>{

    if(selectedEmail !== ""){

      props.messages.users.map(item=>{

        if(item.email === selectedEmail){

          setInformation(item);

        }

      });

    }

  },[
    selectedEmail,
    props.messages.users
  ]);



return (

<div
style={{
width:"100%",
height:"650px",
padding:"20px"
}}
>


<Row
style={{
height:"100%",
border:"1px solid #eee",
borderRadius:"15px",
overflow:"hidden",
background:"#fff"
}}
>



<Col
span={6}
style={{
borderRight:"1px solid #eee",
height:"100%"
}}
>

<Sidebar

selectedEmail={selectedEmail}

setSelectedEmail={setSelectedEmail}

/>

</Col>





<Col
span={hasSelection ? 12 : 18}
style={{
height:"100%"
}}
>


<ChatGround

information={information}

selectedEmail={selectedEmail}

/>


</Col>



{
hasSelection &&
<Col
span={6}
style={{
height:"100%",
borderLeft:"1px solid #eee",
padding:"20px",
overflowY:"auto"
}}
>

<Information
data={information}
/>

</Col>
}



</Row>


</div>

)

}



const mapStateToProps=(state)=>({

auth:state.auth,

messages:state.messages

})


export default connect(
mapStateToProps,
{
initialSocket
}
)(withRouter(Message));