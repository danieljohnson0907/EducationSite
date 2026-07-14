import React,{useState} from 'react';

import TextArea from 'antd/lib/input/TextArea';

import {
Button,
Avatar
}
from 'antd';

import {
SendOutlined
}
from '@ant-design/icons';


import {
connect
}
from 'react-redux';


import {
sendMessage,
acceptOrder
}
from '../../redux/actions/messagesAction';



function ChatGround(props){


const [
messageText,
setMessageText
]=useState("");



function handleSend(){


if(messageText.trim()==="")
return;



props.sendMessage(

props.auth.user.email,

props.selectedEmail,

messageText,

props.messages.messages[
props.messages.messages.length-1
]?.order_id

);



setMessageText("");

}





if(props.selectedEmail===""){


return (

<div

style={{

height:"100%",

display:"flex",

alignItems:"center",

justifyContent:"center",

flexDirection:"column",

color:"#777"

}}

>


<div
style={{
fontSize:"60px"
}}
>
💬
</div>


<h2>
Select a user to start chatting
</h2>


<p>
Choose from your existing conversations or start a new one.
</p>


</div>

)

}





return (

<div

style={{

height:"100%",

display:"flex",

flexDirection:"column"

}}

>





<div

style={{

padding:"15px 20px",

borderBottom:"1px solid #eee",

display:"flex",

alignItems:"center",

justifyContent:"space-between",

gap:"10px"

}}

>

<div
style={{
display:"flex",
alignItems:"center",
gap:"12px"
}}
>

<Avatar/>

<div
style={{
fontSize:"18px",
fontWeight:"600"
}}
>
{props.information?.name || "Chat"}
</div>

</div>

{
props.information?.name &&
props.information.status===0 &&
props.auth.user.type==="expert" &&
<Button
type="primary"
onClick={()=>{
props.acceptOrder(props.information.order_id);
}}
>
Accept Order
</Button>
}

</div>






<div

style={{

flex:1,

padding:"20px",

overflowY:"auto"

}}

>



{

props.messages.messages.length===0 ?


<div
style={{
textAlign:"center",
marginTop:"150px",
color:"#999"
}}
>

No messages yet

</div>



:

props.messages.messages.map(item=>(


<div

key={item._id}

style={{

display:"flex",

justifyContent:

item.sender_email===props.auth.user.email
?
"flex-end"
:
"flex-start",

marginBottom:"15px"

}}

>


<div

style={{

background:

item.sender_email===props.auth.user.email

?
"#ff6542"

:
"#f1f1f1",


color:

item.sender_email===props.auth.user.email

?
"white"
:
"#333",


padding:"12px 18px",

borderRadius:"15px",

maxWidth:"60%"

}}

>

{item.message}


</div>


</div>


))

}



</div>






<div

style={{

padding:"15px 20px",

borderTop:"1px solid #eee",

display:"flex",

alignItems:"flex-end",

gap:"10px"

}}

>


<TextArea

value={messageText}

onChange={(e)=>setMessageText(e.target.value)}

autoSize={{minRows:1,maxRows:4}}

style={{flex:1}}

onPressEnter={(e)=>{

if(!e.shiftKey){

e.preventDefault();

handleSend();

}

}}

/>


<Button

type="primary"

icon={<SendOutlined/>}

onClick={handleSend}

>

Send

</Button>



</div>



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
sendMessage,
acceptOrder
}

)(ChatGround);