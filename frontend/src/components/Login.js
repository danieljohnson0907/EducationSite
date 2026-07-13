import React, { useState } from 'react';
import { Row, Col, Input, Button, notification } from 'antd';
import { UserOutlined, LockFilled } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { formValidation } from '../utils/validators';
import { loginUser } from '../redux/actions/authActions';

import Text from './Text';

function Login(props) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const initialForm = () => {
        setForm({
            email: '',
            password: ''
        });
    };

    const onLogin = () => {
        const validated = formValidation(form);

        if (!validated.status) {
            notification.error({
                message: 'Validation Error',
                description: `Please input the ${validated.key}.`
            });
            return;
        }

        props.loginUser(form);

        if (props.onCancel) {
            props.onCancel();
        }

        initialForm();
    };

    return (
        <div className="auth-form">
            <Text
                color="#111827"
                align="center"
                size="32px"
                fontWeight="700"
                text="Welcome Back"
                style={{
                    marginBottom: '10px'
                }}
            />

            <Text
                color="#6b7280"
                align="center"
                size="14px"
                text="Login to continue your learning journey"
                style={{
                    marginBottom: '25px'
                }}
            />

            <Row gutter={[0, 16]}>
                <Col span={24}>
                    <Input
                        size="large"
                        value={form.email}
                        placeholder="Email Address"
                        prefix={<UserOutlined />}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }
                    />
                </Col>

                <Col span={24}>
                    <Input.Password
                        size="large"
                        value={form.password}
                        placeholder="Password"
                        prefix={<LockFilled />}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                password: e.target.value
                            })
                        }
                    />
                </Col>

                <Col span={24}>
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={onLogin}
                    >
                        Login
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(withRouter(Login));