import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Space } from 'antd';
import { completeOrder } from '../../redux/actions/messagesAction';
function Information(props) {
    function renderStatus(status) {
        if(status === 0) {
            return "Accepting";
        } else if(status === 1) {
            return "Accepted";
        } else if(status === 2) {
            return "Completed";
        }
    }
    return (
        props.data.name !== "" && 
        <div>
            <Space direction="vertical" size="small">
                <div>Name: {props.data.name}</div>
                <div>Email: {props.data.email}</div>
                <div>Birthday: {props.data.birthday}</div>
                <div>Gender: {props.data.gender}</div>
                <div>Budget: {props.data.budget}$</div>
                <div>Order content: {props.data.message}</div>
                <div>Status: {
                    renderStatus(props.data.status)    
                } </div>
                {
                    props.data.status === 1 && props.auth.user.type === "student" &&
                        <Button type="primary"
                            onClick={() => {
                                props.completeOrder(props.data.order_id)
                            }}
                        >
                            Complete Order
                        </Button>
                }
            </Space>
        </div>
    )
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    auth: state.auth
})

export default connect(mapStateToProps, {
    completeOrder
})(withRouter(Information));