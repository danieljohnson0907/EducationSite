import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button, Col, Input, Row, } from 'antd';
import { Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ToExpertUser } from '../../redux/actions/expertsAction';

const FORM_VALUES = [
    {key: "telephone", form_type: "input"},
    {key: "email", form_type: "input"},
    {key: "subject", form_type: "select" ,values:[
        {key: "maths", val: "Math"},
        {key: "physics", val: "Physics"},
        {key: "chemycary", val: "Chemycary"},
    ]},
    {key: "workYear", form_type: "select", values: [
        {key: "1", val: "1"},
        {key: "2", val: "2"},
        {key: "3", val: "3"},
        {key: "4", val: "4"},
        {key: "5", val: "5"},
    ]},
    {key: "degree", form_type: "select" ,values:[
        {key: "doctor", val: "Docter"},
        {key: "scholar", val: "Scholar"},
    ]},
    {key: "message", form_type: "textArea"},
];

function ToExpert(props){
    const [form, setForm] = useState({
        telephone: "",
        email: "",
        subject: "",
        workYear: "",
        degree: "",
        message: "",

    })
    const { Option } = Select;

    const onSend = () => {
        props.ToExpertUser(form)
    }

    useEffect(() => {
        console.log(form);
    }, [form])

    const toExpert =(value)=>{
        if(value.form_type === "input") {
            return <Input value={form[value.key]}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                [value.key]: e.target.value
                            })
                        }}
                    />
        }else if(value.form_type === "select") {
            return <Select style={{ width: "100%" }}
                            onChange={(value_) => {
                                setForm({ ...form, [value.key]: value_ });
                            }}
                            value={form[value.key]}
                        > 
                        {
                            value.values.map((item) =>
                                <Option value={item.key}>{item.val}</Option>
                            )
                        }
                    </Select>
        }else if(value.form_type === "textArea"){
            return <TextArea placeholder="About you" style={{ width: "100%" }}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                [value.key]: e.target.value
                            })
                        }}
                        value={form[value.key]}
                    />
        }
        
    }
    return(
        <>
        <Row>
            <Col md={{span: 4}} sm={{span: 24}}></Col>
            <Col md={{span: 8}} sm={{span: 24}}>
                {
                    FORM_VALUES.map((item) =>
                        <Row gutter={[20, 20]}
                            style={{
                                alignItems: "center"
                            }}
                        >
                            <Col md={{span: 8}} sm={{span: 24}}>
                                <div align="right">
                                    {item.key.charAt(0).toUpperCase() + item.key.slice(1, item.key.length) + ": "}
                                </div>
                            </Col>
                            <Col md={{span: 16}} sm={{span: 24}}>   
                                {toExpert(item)}
                            </Col>
                        </Row>
                    )
                }
                <div align="right" style={{marginTop: "20px"}}>
                    <Button  type="primary" onClick = {() => {onSend()}}>
                        Send
                    </Button>
                </div>
            </Col>
            <Col md={{span: 12}} sm={{span: 24}}></Col>
        </Row>
        </>
    )
    
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, {ToExpertUser})(withRouter(ToExpert));