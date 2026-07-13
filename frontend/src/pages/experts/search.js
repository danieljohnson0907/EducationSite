import React from 'react';
import {
    Row,
    Col,
    Input,
    Button
} from 'antd';

import {
    UserOutlined,
    MailOutlined,
    SearchOutlined
} from '@ant-design/icons';

function Search(props) {

    return (

        <div>

            <h2
                style={{
                    marginBottom: '20px',
                    color: '#1A1F36',
                    fontWeight: 700
                }}
            >
                Find Your Expert
            </h2>

            <Row gutter={[15, 15]}>

                {/* NAME */}

                <Col xs={24} md={10}>

                    <Input
                        size="large"
                        prefix={<UserOutlined />}
                        placeholder="Search by name..."
                        value={props.search.name}
                        onChange={(e) => {

                            props.setSearchForm({
                                ...props.search,
                                name: e.target.value
                            });

                        }}
                        style={{
                            borderRadius: '10px',
                            height: '48px'
                        }}
                    />

                </Col>

                {/* EMAIL */}

                <Col xs={24} md={10}>

                    <Input
                        size="large"
                        prefix={<MailOutlined />}
                        placeholder="Search by email..."
                        value={props.search.email}
                        onChange={(e) => {

                            props.setSearchForm({
                                ...props.search,
                                email: e.target.value
                            });

                        }}
                        style={{
                            borderRadius: '10px',
                            height: '48px'
                        }}
                    />

                </Col>

                {/* BUTTON */}

                <Col xs={24} md={4}>

                    <Button
                        type="primary"
                        size="large"
                        icon={<SearchOutlined />}
                        onClick={props.onSearch}
                        style={{
                            width: '100%',
                            height: '48px',
                            borderRadius: '10px',
                            background: '#FF6B35',
                            borderColor: '#FF6B35',
                            fontWeight: 600
                        }}
                    >
                        Search
                    </Button>

                </Col>

            </Row>

        </div>

    );
}

export default Search;