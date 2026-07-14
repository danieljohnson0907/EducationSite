import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Tag } from 'antd';
import { completeOrder } from '../../redux/actions/messagesAction';

function statusMeta(status) {
    if (status === 0) return { label: "Accepting", color: "orange" };
    if (status === 1) return { label: "Accepted", color: "blue" };
    if (status === 2) return { label: "Completed", color: "green" };
    return { label: "Unknown", color: "default" };
}

function InfoRow({ label, value }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "10px",
            padding: "10px 0",
            borderBottom: "1px solid #f5f5f5"
        }}>
            <span style={{ color: "#999" }}>{label}</span>
            <span style={{ fontWeight: 500, textAlign: "right" }}>{value}</span>
        </div>
    );
}

function Information(props) {

    if (props.data.name === "") return null;

    const { label, color } = statusMeta(props.data.status);

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>

            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "5px" }}>
                Order Details
            </div>

            <InfoRow label="Name" value={props.data.name} />
            <InfoRow label="Email" value={props.data.email} />
            <InfoRow label="Birthday" value={props.data.birthday} />
            <InfoRow label="Gender" value={props.data.gender} />
            <InfoRow label="Budget" value={`$${props.data.budget}`} />
            <InfoRow label="Order content" value={props.data.message} />

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0"
            }}>
                <span style={{ color: "#999" }}>Status</span>
                <Tag color={color}>{label}</Tag>
            </div>

            {
                props.data.status === 1 && props.auth.user.type === "student" &&
                    <Button type="primary" block
                        style={{ marginTop: "20px" }}
                        onClick={() => {
                            props.completeOrder(props.data.order_id)
                        }}
                    >
                        Complete Order
                    </Button>
            }

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
