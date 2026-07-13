import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { getOrdersData } from '../../redux/actions/ordersActions';
import { Select, Space, Table } from 'antd';
function Orders(props) {
    const [columns, setColumns] = useState([]);
    const {Option} = Select;
    useEffect(() => {
        props.getOrdersData("", "all", props.auth.user?.type);
        if(props.auth.user?.type === "student") {
            setColumns([
                {
                    title: 'Expert',
                    dataIndex: 'expert',
                },
                {
                    title: 'Budget($)',
                    dataIndex: 'budget',
                },
                {
                    title: 'Message',
                    dataIndex: 'message',
                },
                {
                    title: 'Create time',
                    dataIndex: 'create_at',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    render: (dataIndex) => {
                        if (dataIndex === 0) return "Accepting";
                        if (dataIndex === 1) return "Accepted";
                        if (dataIndex === 2) return "Completed";
                    }
                }
            ])
        } else {
            setColumns([
                {
                    title: 'Student',
                    dataIndex: 'student',
                },
                {
                    title: 'Budget($)',
                    dataIndex: 'budget',
                },
                {
                    title: 'Message',
                    dataIndex: 'message',
                },
                {
                    title: 'Create time',
                    dataIndex: 'create_at',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                    render: (dataIndex) => {
                        if (dataIndex === 0) return "Accepting";
                        if (dataIndex === 1) return "Accepted";
                        if (dataIndex === 2) return "Completed";
                    }
                }
            ]);
        }
    }, [])
    
    return (
        <div
            style={{
                width: window.screen.width < 1024 ? "90%" : 1024,
                margin: "auto"
            }}
        >
            <Space direction="vertical" style={{width: "100%"}}>
                
                <div style={{ display: "flex" }}>
                    <div style={{ fontSize: "17px", paddingRight: "10px" }}>State:</div>
                    <Select  style={{ width: "120px" }}
                    defaultValue={"all"}
                        onChange={(value) => {
                            props.getOrdersData("", value)
                        }}
                    >
                        <Option value="all">All</Option>
                        <Option value="0">Accepting</Option>
                        <Option value="1">Accepted</Option>
                        <Option value="2">Completed</Option>
                    </Select>
                </div>
                <Table
                    columns={columns}
                    dataSource={props.orders.data}
                >
                </Table>
            </Space>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    orders: state.orders
})

export default connect(mapStateToProps, {
    getOrdersData
})(withRouter(Orders));
