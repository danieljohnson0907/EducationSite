import React, { useState } from 'react';
import {
    Button,
    Col,
    Input,
    Row,
    Upload,
    Image,
    Card,
    Space
} from 'antd';

import TextArea from 'antd/lib/input/TextArea';

import {
    CloudUploadOutlined,
    PictureOutlined,
    EditOutlined,
    SendOutlined
} from '@ant-design/icons';

import { getBase64 } from '../../utils/global';

function Post(props) {

    const [form, setForm] = useState({
        email: props.email,
        title: '',
        content: '',
        image: ''
    });

    const [blogImage, setBlogImage] = useState('');

    function handleChangeImage(file) {
        getBase64(file, (url) => {
            setBlogImage(url);
            setForm((current) => ({
                ...current,
                image: url
            }));
        });

        return false;
    }

    function postBlog() {
        props.postBlog({
            ...form,
            email: props.email
        });

        setForm({
            email: props.email,
            title: '',
            content: '',
            image: ''
        });

        setBlogImage('');
    }

    return (

        <div
            style={{
                width:
                    window.innerWidth < 920
                        ? '95vw'
                        : '980px',
                maxWidth: '100%'
            }}
        >

            <Card
                bordered={false}
                bodyStyle={{
                    padding: window.innerWidth < 720 ? 20 : 30
                }}
                style={{
                    borderRadius: 22,
                    overflow: 'hidden',
                    border: '1px solid #EEF2F7',
                    boxShadow: '0 12px 35px rgba(15,23,42,.08)'
                }}
            >

                <div
                    style={{
                        textAlign: 'center',
                        marginBottom: 28
                    }}
                >

                    <h1
                        style={{
                            fontSize: 30,
                            fontWeight: 900,
                            color: '#0B1220',
                            marginBottom: 8
                        }}
                    >
                        Create New Blog
                    </h1>

                    <p
                        style={{
                            color: '#64748B',
                            fontSize: 14,
                            marginBottom: 0
                        }}
                    >
                        Share online exam tips, subject guides, and student advice.
                    </p>

                </div>

                <Row gutter={[30, 30]} align="middle">

                    <Col xs={24} lg={8}>

                        <div
                            style={{
                                fontWeight: 800,
                                color: '#0B1220',
                                marginBottom: 10
                            }}
                        >
                            Blog Cover Image
                        </div>

                        <Card
                            bordered={false}
                            bodyStyle={{
                                padding: 14
                            }}
                            style={{
                                borderRadius: 16,
                                background: '#FFFFFF',
                                border: '1px solid #EEF2F7'
                            }}
                        >

                            {
                                blogImage ?

                                    <Image
                                        preview={false}
                                        src={blogImage}
                                        style={{
                                            width: '100%',
                                            height: 220,
                                            objectFit: 'cover',
                                            borderRadius: 14
                                        }}
                                    />

                                    :

                                    <div
                                        style={{
                                            height: 220,
                                            border: '2px dashed #FF2D16',
                                            borderRadius: 14,
                                            background: 'linear-gradient(180deg,#FFF7F4 0%,#FFFFFF 100%)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            padding: 18
                                        }}
                                    >

                                        <PictureOutlined
                                            style={{
                                                fontSize: 44,
                                                color: '#FF2D16',
                                                marginBottom: 14
                                            }}
                                        />

                                        <div
                                            style={{
                                                color: '#FF2D16',
                                                fontWeight: 800,
                                                lineHeight: '22px'
                                            }}
                                        >
                                            Upload Blog Cover Image
                                        </div>

                                    </div>
                            }

                            <Upload
                                beforeUpload={handleChangeImage}
                                showUploadList={false}
                                accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                            >

                                <Button
                                    size="large"
                                    icon={<CloudUploadOutlined />}
                                    style={{
                                        marginTop: 12,
                                        width: '100%',
                                        borderRadius: 10,
                                        height: 44,
                                        color: '#FF2D16',
                                        borderColor: '#FFD4CC',
                                        fontWeight: 800
                                    }}
                                >
                                    {
                                        blogImage
                                            ? 'Change Image'
                                            : 'Upload Image'
                                    }
                                </Button>

                            </Upload>

                        </Card>

                    </Col>

                    <Col xs={24} lg={16}>

                        <Space
                            direction="vertical"
                            size="middle"
                            style={{
                                width: '100%'
                            }}
                        >

                            <div>

                                <div
                                    style={{
                                        fontWeight: 800,
                                        color: '#0B1220',
                                        marginBottom: 8
                                    }}
                                >
                                    Title
                                </div>

                                <Input
                                    size="large"
                                    prefix={<EditOutlined />}
                                    placeholder="Example: How to prepare for your online exam"
                                    value={form.title}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            title: e.target.value
                                        });
                                    }}
                                    style={{
                                        height: 46,
                                        borderRadius: 10
                                    }}
                                />

                            </div>

                            <div>

                                <div
                                    style={{
                                        fontWeight: 800,
                                        color: '#0B1220',
                                        marginBottom: 8
                                    }}
                                >
                                    Content
                                </div>

                                <TextArea
                                    rows={9}
                                    placeholder="Write your online exam guide, subject notes, study plan, or student advice here..."
                                    value={form.content}
                                    onChange={(e) => {
                                        setForm({
                                            ...form,
                                            content: e.target.value
                                        });
                                    }}
                                    style={{
                                        borderRadius: 10,
                                        resize: 'none'
                                    }}
                                />

                                <div
                                    style={{
                                        textAlign: 'right',
                                        color: '#94A3B8',
                                        fontSize: 12,
                                        marginTop: 4
                                    }}
                                >
                                    {form.content.length} / 10000
                                </div>

                            </div>

                            <Button
                                type="primary"
                                size="large"
                                icon={<SendOutlined />}
                                block
                                style={{
                                    background: '#FF2D16',
                                    borderColor: '#FF2D16',
                                    borderRadius: 10,
                                    height: 52,
                                    fontWeight: 800,
                                    boxShadow: '0 10px 24px rgba(255,45,22,.25)'
                                }}
                                onClick={postBlog}
                            >
                                Publish Blog
                            </Button>

                        </Space>

                    </Col>

                </Row>

            </Card>

        </div>

    );
}

export default Post;
