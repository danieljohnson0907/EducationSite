import React from 'react';

import {
Avatar
}
from 'antd';

import {
connect
}
from 'react-redux';

import {
withRouter
}
from 'react-router-dom';


import {
getMessagesData
}
from '../../redux/actions/messagesAction';



function Sidebar(props){


function selectUser(email){


props.setSelectedEmail(email);


if(props.auth.isAuthenticated){

props.getMessagesData(
props.auth.user.email,
email
);

}


}



return (

<div
style={{
height:"100%",
background:"#fff"
}}
>



<h3
style={{
padding:"20px",
margin:0
}}
>
Conversations
</h3>



<div
style={{
padding:"0 20px 20px"
}}
>

<input

placeholder="Search conversations..."

style={{
width:"100%",
padding:"12px",
border:"1px solid #eee",
borderRadius:"8px"
}}

/>

</div>





{

props.messages.users.length===0 ?

<div
style={{
textAlign:"center",
marginTop:"150px",
color:"#888"
}}
>

<div style={{
fontSize:"40px"
}}>
💬
</div>


<h4>
No conversations yet
</h4>


<p>
Start a new conversation by selecting a user
</p>


</div>


:



props.messages.users.map(item=>(


<div

key={item.email}

onClick={()=>selectUser(item.email)}

style={{

display:"flex",

alignItems:"center",

padding:"15px",

cursor:"pointer",

background:
item.email===props.selectedEmail
?
"#fff1ed"
:
"white",

borderBottom:"1px solid #eee"

}}

>


<Avatar />


<div
style={{
marginLeft:"12px"
}}
>


<div
style={{
fontWeight:"600"
}}
>

{item.name}

</div>


<div
style={{
fontSize:"12px",
color:"#888"
}}
>

{item.email}

</div>



</div>



</div>


))


}



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
getMessagesData
}

)(withRouter(Sidebar));