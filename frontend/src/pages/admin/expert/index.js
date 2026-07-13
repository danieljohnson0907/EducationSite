import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Space, Table, Button, Select, Input } from 'antd';
import Modal from '../../../components/Modal';
import Text from '../../../components/Text';
import { allowExpert, getExperts } from '../../../redux/actions/admin/expertsAction';

function Experts(props) {
    const [searchForm, setSearchForm] = useState({
        state: 'all',
        email: ''
    });
    const texts = {
        allow: "Do you really want to allow?",
        block: "Do you really want to block?"
    };
    const [selectedEmail, setSelectedEmail] = useState("");
    const [textType, setTextType] = useState("allow");
    const [isOpenModal, setIsOpenModal] = useState(false);
    useEffect(() => {
        props.getExperts(searchForm);
    }, [])
    const { Option } = Select;
    const columns = [
        {
            title: 'Telephone',
            dataIndex: 'telephone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
        },
        {
            title: 'WorkYear',
            dataIndex: 'workYear',
        },
        {
            title: 'Message',
            dataIndex: 'message',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (dataIndex) => {
                if (dataIndex === 2) return "Applying";
                if (dataIndex === 1) return "Applied";
            }
        },
        {
            title: "Operator",
            render: (obj) => <div style={{ display: "flex" }}>
                <Button type={
                    obj.role === 2 ? "primary" : "danger"
                } onClick={() => isOpenAllowModal(obj)}>
                    {obj.role === 2 ? "Allow" : "Block"}
                </Button>
            </div>
        }
    ]

    function isOpenAllowModal(data) {
        setIsOpenModal(true);
        setTextType(data.role === 2 ? "allow" : "block");
        setSelectedEmail(data.email);
    }

    function onAllow() {
        props.allowExpert(selectedEmail);
        setIsOpenModal(false)
    }
    function onSearch() {
        props.getExperts(searchForm);
    }

    return <div>
        <Modal isOpen={isOpenModal} onCancel={() => setIsOpenModal(false)}>
            <Text text={texts[textType]} />
            <div style={{marginTop: "15px"}}>
                <Button onClick={() => onAllow()} type="primary">Yes</Button>
                <Button onClick={() => setIsOpenModal(false)}
                    style={{marginLeft: "10px"}}
                >No</Button>
            </div>
        </Modal>
        <div
        >
            <Space direction="vertical" style={{width: "100%"}}>
            <div style={{ display: "flex" }}>
                    <div style={{ fontSize: "17px", paddingRight: "10px" }}>State:</div>
                    <Select value={searchForm["state"]} style={{ width: "80px" }}
                        onChange={(value) => {
                            setSearchForm({ ...searchForm, state: value })
                        }}
                    >
                        <Option value="all">All</Option>
                        <Option value="2">Applying</Option>
                        <Option value="1">Applied</Option>
                    </Select>
                    <Input value={searchForm['email']} placename="Email"
                        onChange={(e) => setSearchForm({
                            ...searchForm,
                            email: e.target.value
                        })}
                    />
                    <Button type="primary" onClick={() => onSearch()}>Search</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={props.admin_experts.experts}
                >
                </Table>
            </Space>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    admin_experts: state.admin_experts
})

export default connect(mapStateToProps, { getExperts, allowExpert })(withRouter(Experts));