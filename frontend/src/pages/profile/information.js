import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Col, Input, Row, DatePicker, Avatar, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { formValidation } from '../../utils/validators';
import { editInformation, getInformation } from '../../redux/actions/profileAction'
import { Select } from 'antd';
import moment from 'moment';
import { getBase64, getAvatarUrl } from '../../utils/global';

const FORM_VALUES = [
    {key: "name", form_type: "input"},
    {key: "email", form_type: "input"},
    {key: "birthday", form_type: "birthday"},
    {key: "gender", form_type: "select"},
];

function Information(props) {
   
    const [form, setForm] = useState({
        name: "",
        email: "",
        gender: "",
        birthday: "",
        avatar: "",
    })
    const [isEdit, setIsEdit] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState("");
    function onChangeBirthday(date, dateString) {
        setForm({
            ...form,
            birthday: dateString
        })
    }
    const { Option } = Select;
    const renderInput = (value) => {
        console.log(moment(form[value.key]))
        if(value.form_type === "input") {
            return isEdit?
            <Input value={form[value.key]}
                onChange={(e) => {
                    setForm({
                        ...form,
                        [value.key]: e.target.value
                    })
                }}
            />:
            <label>{form[value.key]}</label>
        } else if(value.form_type === "select") {
            return isEdit?
             <Select defaultValue="man" style={{ width: "100%" }}
                    onChange={(value) => {
                        setForm({ ...form, gender: value });
                    }}
                    value={form[value.key]}
                >
                    <Option value="man">Man</Option>
                    <Option value="woman">Woman</Option>
            </Select>
            : <label>{form[value.key]}</label>
        } else if(value.form_type === "birthday") {
            return isEdit?
            <DatePicker onChange={onChangeBirthday}
                style={{width: "100%"}}
                placeholder="Birthday"
                value={moment(form[value.key], 'YYYY-MM-DD')}
            />
            : <label>{moment(form[value.key]).format('YYYY-MM-DD')}</label>
        }
    }
        useEffect(() => {
        props.getInformation(props.auth.user.email);
    }, [])
    useEffect(() => {
        setForm(props.profile.data);
        console.log(123);
    }, [props.profile.data])
    function onUpdate() {
        const validated = formValidation(form);
        // if(!validated.status) {
        //     notification.error({
        //         description: "Please input " + validated.key
        //     })
        //     return;
        // }
        // API
        props.editInformation(form, props.auth.user.email).then(() => {
            setAvatarPreview("");
            props.getInformation(props.auth.user.email);
        });
        setIsEdit(!isEdit)
    }

    function handleChangeImage(file) {
        getBase64(file, (url) => {
            setAvatarPreview(url);
            setForm({
                ...form,
                avatar: url
            })
        });
        return false;
    }
    return (
        
        <>
            <div className="information-img">
                <div className="information-form">
                    <div style={{display: "flex", justifyContent: "center"} }>
                        
                        <Upload
                            beforeUpload={handleChangeImage}
                            showUploadList={false}
                            accept="image/*"
                        >
                            <Avatar
                                size={64}
                                src={avatarPreview || getAvatarUrl(form)}
                                icon={<UserOutlined />}
                                style={{ cursor: "pointer", zIndex: 10 }}
                            />
                        </Upload>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        {
                            FORM_VALUES.map((item) =>
                                <Row gutter={[20, 20]}
                                    style={{
                                        alignItems: "center"
                                    }}
                                >
                                    <Col md={{span: 12}} sm={{span: 24}}>
                                        <div align="right">
                                            {item.key.charAt(0).toUpperCase() + item.key.slice(1, item.key.length) + ": "}
                                        </div>
                                    </Col>
                                    <Col md={{span: 12}} sm={{span: 24}}>   
                                        {renderInput(item)}
                                    </Col>
                                </Row>
                            )
                        }
                    </div>
                    
                    <div align="center" style={{marginTop: "20px"}}>
                        <Button type="primary"
                            onClick={() => {
                                isEdit ? onUpdate() : setIsEdit(true)
                            }}
                        >
                            {
                                isEdit ? "Update" : "Edit"
                            }
                        </Button>
                        {
                            isEdit ? <Button type="default" onClick = {() => { setIsEdit(false); }}>Cancel</Button>:<></>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
})

export default connect(mapStateToProps, {editInformation, getInformation})(withRouter(Information));