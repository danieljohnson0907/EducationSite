import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { changeType, getUsers, getBlogs } from '../../../redux/actions/admin/usersActions';
import { Space, Table, Button, Select, Avatar } from 'antd';
import Modal from '../../../components/Modal';
import { getAvatarUrl } from '../../../utils/global';

function Users(props) {
    const [role, setRole] = useState('all');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(props.blogs.data.length > 0 ? props.blogs.data[0]._id : "");
    const [selectedEmail, setSelectedEmail] = useState("");
    const { Option } = Select;

    useEffect(() => {
        props.getUsers(role);
        props.getBlogs();
    }, [])
    useEffect(() => {
        props.getUsers(role);
    }, [role])
    
    const columns = [
        {
            title: 'Avatar',
            render: (obj) => <Avatar src={getAvatarUrl(obj)} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
        },
        {
            title: 'Birthday',
            dataIndex: 'birthday',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text) => {
                if (text === 1) return "User";
                else if (text === 2) return "Administrator";
                else return "Blocked";
            }
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: "Operator",
            render: (obj) => <div style={{ display: "flex" }}>
                <Button type={obj.type === "student" ? "primary" : "default"}
                    onClick={() => {
                        if(obj.type === "student") {
                            setSelectedEmail(obj.email);
                            setIsOpenModal(true);
                        } else {
                            props.changeType(obj.email)
                        }
                    }}
                >
                    {
                        obj.type === "student" ? "To Expert" : "To Student"
                    }
                </Button>
            </div>
        }
    ];

    function onChangeUserType() {

    }

    return <div>
        <Modal
            isOpen={isOpenModal}
            onCancel={() => {
                setIsOpenModal(false);
            }}
        >
            <Space direction="vertical" size="small" style={{width: "100%"}}>
                <Select value={selectedBlogId}
                    onChange={(value) => {
                        console.log(value);
                        setSelectedBlogId(value);
                    }}
                    style={{ width: "100%" }}
                >
                    {
                        props.blogs.data.map((item) =>
                            <Option value={item._id}>{item.title}</Option>
                        )
                    }
                </Select>
                <Button
                    onClick={() => {
                        props.changeType(selectedEmail, selectedBlogId);
                        setIsOpenModal(false);
                    }}
                >
                    To Expert
                </Button>
            </Space>
        </Modal>
        <Space direction="vertical" style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ fontSize: "17px", paddingRight: "10px" }}>Role: </div>
                <Select defaultValue="all" style={{ width: "80px" }}
                    onChange={(value) => {
                        setRole(value);
                    }}
                >
                    <Option value="all">All</Option>
                    <Option value="1">User</Option>
                    <Option value="2">Administrator</Option>
                </Select>

            </div>
            <Table
                columns={columns}
                dataSource={props.admin_users.users}
            >
            </Table>
        </Space>
    </div>
}

const mapStateToProps = (state) => ({
    admin_users: state.admin_users,
    blogs: state.blogs
})

export default connect(mapStateToProps, { getUsers, changeType, getBlogs })(withRouter(Users));