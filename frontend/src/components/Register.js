import React, { useState } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Input,
  Button,
  notification,
  Select,
  Avatar,
  Upload,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  LockFilled,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { formValidation } from "../utils/validators";
import { registerUser } from "../redux/actions/authActions";
import Text from "./Text";
import { getBase64 } from "../utils/global";

const { Option } = Select;

function Register(props) {
  const [avatarBase64, setAvatarBase64] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    type: "student",
    files: null,
    gender: "man",
});

  const initialForm = () => {
    setForm({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      type: "student",
      files: null,
      birthday: "",
      gender: "man",
    });

    setAvatarBase64("");
  };

  const onRegister = () => {
    const validated = formValidation(form);

    if (!validated.status) {
      notification.error({
        message: "Validation Error",
        description: `Please input ${validated.key}.`,
      });
      return;
    }

    if (form.password !== form.confirmPassword) {
      notification.error({
        message: "Password Error",
        description: "Confirm password does not match.",
      });
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    props.registerUser(formData);

    props.onCancel();

    initialForm();
  };

  const handleChangeImage = (file) => {
    setForm({
      ...form,
      files: file,
    });

    getBase64(file, (url) => {
      setAvatarBase64(url);
    });

    return false;
  };

  const onChangeBirthday = (date, dateString) => {
    setForm({
      ...form,
      birthday: dateString,
    });
  };

  return (
    <>
      <Text
        color="black"
        align="center"
        size="33px"
        fontWeight="bold"
        text="Register"
      />

      <Row gutter={[12, 12]} style={{ marginTop: 30 }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Upload
            showUploadList={false}
            beforeUpload={handleChangeImage}
          >
            <Avatar
              size={90}
              src={avatarBase64 || undefined}
              icon={!avatarBase64 ? <UserOutlined /> : null}
              style={{
                cursor: "pointer",
                border: "2px solid #1890ff",
              }}
            />
          </Upload>
        </Col>

        <Col span={24}>
          <Input
            size="large"
            placeholder="Full Name"
            prefix={<UserOutlined />}
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </Col>

        <Col span={24}>
          <Input
            size="large"
            placeholder="Email"
            type="email"
            prefix={<UserOutlined />}
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />
        </Col>

        {/* <Col span={24}>
          <DatePicker
                style={{ width: "100%" }}
                placeholder="Birthday"
                onChange={(date, dateString) => {
                    console.log("DATE:", date);
                    console.log("STRING:", dateString);

                    setForm(prev => ({
                        ...prev,
                        birthday: dateString
                    }));
                }}
            />
        </Col> */}

        <Col span={24}>
          <Select
            value={form.gender}
            style={{ width: "100%" }}
            onChange={(value) =>
              setForm({
                ...form,
                gender: value,
              })
            }
          >
            <Option value="man">Man</Option>
            <Option value="woman">Woman</Option>
          </Select>
        </Col>

        <Col span={24}>
          <Input.Password
            size="large"
            placeholder="Password"
            prefix={<LockFilled />}
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />
        </Col>

        <Col span={24}>
          <Input.Password
            size="large"
            placeholder="Confirm Password"
            prefix={<LockFilled />}
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
          />
        </Col>

        <Col span={24}>
          <Select
            value={form.type}
            style={{ width: "100%" }}
            onChange={(value) =>
              setForm({
                ...form,
                type: value,
              })
            }
          >
            <Option value="student">Student</Option>
            <Option value="expert">Expert</Option>
          </Select>
        </Col>

        <Col span={24}>
          <Button
            type="primary"
            size="large"
            block
            onClick={onRegister}
          >
            Register
          </Button>
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));