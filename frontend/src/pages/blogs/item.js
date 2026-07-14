import React from 'react';
import {
    Card,
    Button,
    Tag,
    Space
} from 'antd';

import {
    ArrowRightOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';

const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL ||
    'https://educationsite-production.up.railway.app';

function Item(props) {

    const content = props.data.content || '';
    const title = props.data.title || '';

    const imageUrl =
        props.data.image_url ||
        (
            props.data.image_extension
                ? `${BACKEND_URL}/assets/img/blogs/${props.data._id}.${props.data.image_extension}`
                : '/assets/img/default-blog.jpg'
        );

    const getSubject = () => {
        const text = title.toLowerCase();

        if (text.includes('mathematics') || text.includes('math')) return 'Mathematics';
        if (text.includes('biology')) return 'Biology';
        if (text.includes('chemistry')) return 'Chemistry';
        if (text.includes('physics')) return 'Physics';
        if (text.includes('history')) return 'History';
        if (text.includes('computer science') || text.includes('ict') || text.includes('computer')) return 'Computer Science / ICT';
        if (text.includes('SOCIAL SCIENCES & HUMANITIES') || /\bpe\b/i.test(title)) return 'SOCIAL SCIENCES & HUMANITIES';

        return 'Subject';
    };

    const formatDate = (date) => {
        if (!date) return '';

        try {
            return new Date(date).toLocaleDateString();
        } catch (err) {
            return date;
        }
    };

    return (

        <Card
            hoverable
            bordered={false}
            bodyStyle={{
                padding: 0
            }}
            style={{
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid #EEF2F7',
                boxShadow: '0 10px 30px rgba(15,23,42,.06)',
                background: '#FFFFFF',
                marginBottom: 18
            }}
        >

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    minHeight: 190
                }}
            >

                <div
                    style={{
                        flex: '0 0 320px',
                        padding: 18
                    }}
                >

                    <div
                        style={{
                            width: '100%',
                            height: 155,
                            borderRadius: 14,
                            background: '#F8FAFC',
                            border: '1px solid #EEF2F7',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}
                    >

                        <img
                            src={imageUrl}
                            alt={title}
                            onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/assets/img/default-blog.jpg';
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                objectPosition: 'center',
                                display: 'block'
                            }}
                        />

                    </div>

                </div>

                <div
                    style={{
                        flex: 1,
                        minWidth: 300,
                        padding: '20px 12px'
                    }}
                >

                    <Tag
                        style={{
                            background: '#FFF1EC',
                            color: '#FF2D16',
                            border: 'none',
                            borderRadius: 999,
                            padding: '4px 12px',
                            fontWeight: 800,
                            fontSize: 12,
                            marginBottom: 12
                        }}
                    >
                        {getSubject()}
                    </Tag>

                    <h2
                        style={{
                            fontSize: 25,
                            fontWeight: 900,
                            color: '#0B1220',
                            lineHeight: 1.2,
                            margin: '0 0 10px'
                        }}
                    >
                        {title}
                    </h2>

                    <p
                        style={{
                            color: '#334155',
                            fontSize: 15,
                            lineHeight: '24px',
                            margin: '0 0 14px',
                            maxWidth: 700
                        }}
                    >
                        {
                            content.length > 160
                                ? content.substring(0, 160) + '...'
                                : content
                        }
                    </p>

                    <Space
                        size="middle"
                        wrap
                        style={{
                            color: '#475569',
                            fontSize: 13
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

                        <Space size={6}>

                            <ClockCircleOutlined />

                            <span>
                                {formatDate(props.data.create_at)}
                            </span>

                        </Space>

                    </Space>

                </div>

                <div
                    style={{
                        flex: '0 0 180px',
                        padding: 18,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >

                    <Button
                        type="primary"
                        icon={<ArrowRightOutlined />}
                        style={{
                            background: '#FF2D16',
                            borderColor: '#FF2D16',
                            borderRadius: 12,
                            height: 44,
                            paddingLeft: 20,
                            paddingRight: 20,
                            fontWeight: 800,
                            fontSize: 14,
                            boxShadow: '0 10px 22px rgba(255,45,22,.22)'
                        }}
                        onClick={() => props.showDetail()}
                    >
                        Read Article
                    </Button>

                </div>

            </div>

        </Card>

    );
}

export default Item;
