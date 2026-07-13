import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Text from '../../components/Text';
import { Avatar, Space, notification } from 'antd';
import { getMessagesData } from '../../redux/actions/messagesAction';
function Sidebar(props) {
    function getMessagesData(email) {
        props.setSelectedEmail(email);
        if(!props.auth.isAuthenticated) {
            notification.error({
                description: "Please login"
            })
            return;
        }
        props.getMessagesData(props.auth.user?.email, email);
    }
    useEffect(() => {
    }, [])
    return (
        <div
        >
            {
                props.messages.users.length === 0 ?
                    <div align="center">
                        <Text
                            text="There are no advices"
                            size="20px"
                        />
                    </div>
                    :
                    <Space direction="vertical" size="medium" style={{ width: "100%" }}>
                        {
                            props.messages.users.map((item) =>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    cursor: "pointer",
                                    padding: "10px",
                                    width: "100%",
                                    background: item.email === props.selectedEmail ? "#7ec1ff" : "white",
                                    borderBottom: "1px solid #efe7e7"
                                }}
                                    onClick={() => {
                                        getMessagesData(item.email);
                                    }}
                                >
                                    <Avatar />
                                    <div style={{ marginLeft: "10px" }}>
                                        <Text text={item.name} size="17px" />
                                        <Text text={item.email} />
                                    </div>
                                </div>
                            )
                        }
                    </Space>
            }

        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    messages: state.messages
})

export default connect(mapStateToProps, {
    getMessagesData
})(withRouter(Sidebar));