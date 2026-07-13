import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Text from '../../../components/Text';
import { Avatar, Space } from 'antd';
import { getAdviceMessages } from '../../../redux/actions/admin/adviceActions';
function Sidebar(props) {
    function getAdviceMessages(email) {
        props.setSelectedEmail(email);
        props.getAdviceMessages(email, props.auth.user.email);
    }
    useEffect(() => {
    }, [])
    return (
        <div
            style={{
                height: "100%",
                overflowY: 'scroll'
            }}
        >
            {
                props.admin_advice.users.length === 0 ?
                    <div align="center">
                        <Text
                            text="There are no advices"
                            size="20px"
                        />
                    </div>
                    :
                    <Space direction="vertical" size="medium" style={{ width: "100%" }}>
                        {
                            props.admin_advice.users.map((item) =>
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
                                        getAdviceMessages(item.email);
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
    admin_advice: state.admin_advice
})

export default connect(mapStateToProps, {
    getAdviceMessages
})(withRouter(Sidebar));