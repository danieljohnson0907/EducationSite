import React, { useState } from 'react';
import {
    Button,
    Space,
    Image,
    Card,
    Divider,
    Row,
    Col
} from 'antd';

import {
    ClockCircleOutlined,
    WechatOutlined,
    ArrowLeftOutlined,
    SendOutlined
} from '@ant-design/icons';

import TextArea from 'antd/lib/input/TextArea';

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL ||
    'https://educationsite-production.up.railway.app';

function Detail(props) {

    const [comment, setComment] = useState('');

    const comments = props.comments || [];
    const content = props.data.content || '';
    const title = props.data.title || '';

    const imageUrl =
        props.data.image_url ||
        (
            props.data.image_extension
                ? `${BACKEND_URL}/assets/img/blogs/${props.data._id}.${props.data.image_extension}`
                : '/assets/img/default-blog.jpg'
        );

    const formatDate = (date) => {
        if (!date) return '';

        try {
            return new Date(date).toLocaleDateString();
        } catch (err) {
            return date;
        }
    };

    return (

        <div
            style={{
                maxWidth: '1440px',
                margin: '0 auto',
                padding: '6px 8px 35px'
            }}
        >

            <Button
                icon={<ArrowLeftOutlined />}
                type="link"
                style={{
                    color: '#FF2D16',
                    fontWeight: 800,
                    paddingLeft: 0,
                    marginBottom: 12
                }}
                onClick={() => props.goBack()}
            >
                Back to Blogs
            </Button>

            <Row gutter={[24, 24]}>

                <Col xs={24} lg={16}>

                    <Card
                        bordered={false}
                        bodyStyle={{
                            padding: 0
                        }}
                        style={{
                            borderRadius: 18,
                            overflow: 'hidden',
                            border: '1px solid #EEF2F7',
                            boxShadow: '0 8px 26px rgba(15,23,42,.055)'
                        }}
                    >

                        <div
                            style={{
                                width: '100%',
                                minHeight: 280,
                                maxHeight: 430,
                                background: '#FFFFFF',
                                borderBottom: '1px solid #EEF2F7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden'
                            }}
                        >
                            <Image
                                preview={false}
                                src={imageUrl}
                                fallback="/assets/img/default-blog.jpg"
                                style={{
                                    width: '100%',
                                    maxHeight: 430,
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    display: 'block',
                                    marginTop: '50px',
                                }}
                            />
                        </div>

                        <div
                            style={{
                                padding: window.innerWidth < 720 ? 20 : 28
                            }}
                        >

                            <h1
                                style={{
                                    fontSize: window.innerWidth < 720 ? 26 : 34,
                                    fontWeight: 900,
                                    color: '#0B1220',
                                    lineHeight: 1.22,
                                    margin: '0 0 12px'
                                }}
                            >
                                {title}
                            </h1>

                            <Space
                                size="large"
                                wrap
                                style={{
                                    color: '#475569',
                                    marginBottom: 20
                                }}
                            >

                                <span
                                    style={{
                                        fontWeight: 800,
                                        color: '#111827'
                                    }}
                                >
                                    {props.data.name || 'EducationSite'}
                                </span>

                                <Space>

                                    <ClockCircleOutlined />

                                    <span>
                                        {formatDate(props.data.create_at)}
                                    </span>

                                </Space>

                            </Space>

                            <Divider />

                            <div
                                style={{
                                    fontSize: 15,
                                    lineHeight: '30px',
                                    color: '#334155',
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {content}
                            </div>

                        </div>

                    </Card>

                </Col>

                <Col xs={24} lg={8}>

                    <Card
                        bordered={false}
                        style={{
                            borderRadius: 18,
                            border: '1px solid #EEF2F7',
                            boxShadow: '0 8px 26px rgba(15,23,42,.055)',
                            marginBottom: 20
                        }}
                    >

                        <Space
                            size="middle"
                            style={{
                                marginBottom: 14
                            }}
                        >

                            <WechatOutlined
                                style={{
                                    fontSize: 24,
                                    color: '#FF2D16'
                                }}
                            />

                            <h2
                                style={{
                                    margin: 0,
                                    color: '#0B1220',
                                    fontSize: 20,
                                    fontWeight: 900
                                }}
                            >
                                Comments ({comments.length})
                            </h2>

                        </Space>

                        <Divider style={{ margin: '12px 0 18px' }} />

                        {
                            comments.length === 0 ?

                                <div
                                    style={{
                                        textAlign: 'center',
                                        padding: '28px 10px',
                                        color: '#94A3B8'
                                    }}
                                >
                                    No comments yet.
                                </div>

                                :

                                comments.map((item, index) => (

                                    <div
                                        key={index}
                                        style={{
                                            padding: '12px 0',
                                            borderBottom:
                                                index === comments.length - 1
                                                    ? 'none'
                                                    : '1px solid #F1F5F9'
                                        }}
                                    >

                                        <div
                                            style={{
                                                fontWeight: 800,
                                                color: '#0B1220',
                                                marginBottom: 4
                                            }}
                                        >
                                            {item.title}
                                        </div>

                                        <div
                                            style={{
                                                color: '#475569',
                                                lineHeight: '22px',
                                                fontSize: 13
                                            }}
                                        >
                                            {item.content}
                                        </div>

                                        <div
                                            style={{
                                                color: '#94A3B8',
                                                marginTop: 6,
                                                fontSize: 11
                                            }}
                                        >
                                            {formatDate(item.create_at)}
                                        </div>

                                    </div>

                                ))
                        }

                    </Card>

                    <Card
                        bordered={false}
                        style={{
                            borderRadius: 18,
                            border: '1px solid #EEF2F7',
                            boxShadow: '0 8px 26px rgba(15,23,42,.055)'
                        }}
                    >

                        <h2
                            style={{
                                color: '#0B1220',
                                marginBottom: 14,
                                fontSize: 18,
                                fontWeight: 900
                            }}
                        >
                            Leave a Comment
                        </h2>

                        <TextArea
                            rows={5}
                            value={comment}
                            placeholder="Write your comment..."
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            style={{
                                borderRadius: 10,
                                resize: 'none'
                            }}
                        />

                        <Button
                            type="primary"
                            size="large"
                            icon={<SendOutlined />}
                            block
                            style={{
                                marginTop: 14,
                                background: '#FF2D16',
                                borderColor: '#FF2D16',
                                borderRadius: 10,
                                height: 46,
                                fontWeight: 800,
                                boxShadow: '0 8px 18px rgba(255,45,22,.22)'
                            }}
                            onClick={() => {

                                props.postComment(comment);

                                setComment('');

                            }}
                        >
                            Post Comment
                        </Button>

                    </Card>

                </Col>

            </Row>

        </div>
    );
}

export default Detail;
