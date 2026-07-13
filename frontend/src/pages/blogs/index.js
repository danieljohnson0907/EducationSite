import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    getBlogs,
    getComments,
    postComment,
    postBlog
} from '../../redux/actions/blogsAction';

import {
    Button,
    Col,
    Input,
    Row,
    Space,
    notification,
    Card
} from 'antd';

import {
    SearchOutlined,
    FileTextOutlined,
    EditOutlined
} from '@ant-design/icons';

import Modal from '../../components/Modal';
import Post from './post';
import { formValidation } from '../../utils/validators';
import Item from './item';
import Text from '../../components/Text';
import Detail from './detail';

function Blogs(props) {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isDetail, setIsDetail] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    const [searchTitle, setSearchTitle] = useState('');
    const [searchContent, setSearchContent] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');

    useEffect(() => {
        props.getBlogs();
    }, []);

    const postBlogData = (data) => {

        const validated = formValidation(data);

        if (!validated.status) {
            notification.error({
                description: 'Please input ' + validated.key
            });
            return;
        }

        props.postBlog(data);
    };

    const postCommentData = (comment) => {

        if (comment === '') {
            notification.error({
                description: 'Please input the comment'
            });
            return;
        }

        if (!props.auth.isAuthenticated) {
            notification.error({
                description: 'Please login'
            });
            return;
        }

        props.postComment({
            email: props.auth.user?.email,
            parent_email: selectedData.email,
            comment
        });
    };

    const openPostModal = () => {

        if (!props.auth.isAuthenticated) {
            notification.error({
                description: 'Please log in before posting a blog'
            });
            return;
        }

        setIsOpenModal(true);
    };

    const examSubjects = [
        {
            icon: '▦',
            name: 'All Subjects',
            keywords: []
        },
        {
            icon: '📖',
            name: 'English',
            keywords: ['english']
        },
        {
            icon: '∑',
            name: 'Mathematics',
            keywords: ['mathematics', 'math']
        },
        {
            icon: '🧬',
            name: 'Biology',
            keywords: ['biology']
        },
        {
            icon: '⚗',
            name: 'Chemistry',
            keywords: ['chemistry']
        },
        {
            icon: '⚛',
            name: 'Physics',
            keywords: ['physics']
        },
        {
            icon: '🏛',
            name: 'History',
            keywords: ['history']
        },
        {
            icon: '🌍',
            name: 'Geography',
            keywords: ['geography']
        },
        {
            icon: '💻',
            name: 'Computer Science / ICT',
            keywords: ['computer science', 'ict', 'computer']
        },
        {
            icon: '🏃',
            name: 'Physical Education',
            keywords: ['physical education', 'pe']
        }
    ];

    const subjectMatchesTitle = (blogTitle) => {
        if (selectedSubject === 'All Subjects') return true;

        const selected = examSubjects.find((item) => item.name === selectedSubject);
        if (!selected) return true;

        const title = (blogTitle || '').toLowerCase();

        return selected.keywords.some((keyword) => {
            if (keyword === 'pe') {
                return /\bpe\b/i.test(blogTitle || '');
            }

            return title.includes(keyword.toLowerCase());
        });
    };

    const filteredBlogs = (props.blogs.data || []).filter((item) => {

        const title = item.title || '';
        const content = item.content || '';

        const titleMatch =
            title
                .toLowerCase()
                .includes(searchTitle.toLowerCase());

        const contentMatch =
            content
                .toLowerCase()
                .includes(searchContent.toLowerCase());

        const subjectMatch = subjectMatchesTitle(title);

        return titleMatch && contentMatch && subjectMatch;
    });

    return (
        <div
            style={{
                padding: window.innerWidth < 720 ? '18px 12px' : '24px 40px',
                background: '#FFFFFF',
                minHeight: '100vh'
            }}
        >

            <Modal
                isOpen={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
            >
                <Post
                    email={props.auth.user?.email}
                    postBlog={postBlogData}
                />
            </Modal>

            {
                isDetail ?

                    <Detail
                        isDetail={isDetail}
                        goBack={() => {
                            setIsDetail(false);
                        }}
                        postComment={postCommentData}
                        data={selectedData}
                        comments={props.blogs.comments}
                    />

                    :

                    <div
                        style={{
                            maxWidth: '1440px',
                            margin: '0 auto'
                        }}
                    >

                        <Card
                            bordered={false}
                            bodyStyle={{
                                padding: window.innerWidth < 720 ? 24 : '42px 48px'
                            }}
                            style={{
                                borderRadius: 18,
                                marginBottom: 18,
                                overflow: 'hidden',
                                background:
                                    'linear-gradient(105deg,#FFF8F4 0%,#FFFFFF 50%,#FFF1EC 100%)',
                                boxShadow:
                                    '0 10px 32px rgba(15,23,42,.08)',
                                border: '1px solid #FDE7E1'
                            }}
                        >

                            <Row align="middle" gutter={[36, 30]}>

                                <Col xs={24} lg={13}>

                                    <div
                                        style={{
                                            color: '#FF2D16',
                                            fontWeight: 900,
                                            marginBottom: 12,
                                            fontSize: 15
                                        }}
                                    >
                                        🎓 EducationSite Blogs
                                    </div>

                                    <h1
                                        style={{
                                            fontSize: window.innerWidth < 720 ? 38 : 48,
                                            fontWeight: 950,
                                            color: '#0A0F1F',
                                            marginBottom: 14,
                                            lineHeight: 1.12,
                                            letterSpacing: '-1.2px'
                                        }}
                                    >
                                        Prepare for Online Exams
                                        <br />
                                        <span
                                            style={{
                                                color: '#FF2D16'
                                            }}
                                        >
                                            with Confidence
                                        </span>
                                    </h1>

                                    <p
                                        style={{
                                            color: '#334155',
                                            fontSize: 16,
                                            maxWidth: 620,
                                            lineHeight: '27px',
                                            marginBottom: 26
                                        }}
                                    >
                                        Explore study guides, exam tips, subject resources,
                                        and strategies to help students succeed in online exams.
                                    </p>

                                    <Space
                                        size="middle"
                                        wrap
                                    >

                                        {
                                            props.auth.user?.role === 2 &&

                                            <Button
                                                type="primary"
                                                size="large"
                                                icon={<EditOutlined />}
                                                style={{
                                                    background: '#FF2D16',
                                                    borderColor: '#FF2D16',
                                                    borderRadius: 9,
                                                    minWidth: 150,
                                                    height: 46,
                                                    fontWeight: 800,
                                                    boxShadow: '0 10px 24px rgba(255,45,22,.25)'
                                                }}
                                                onClick={openPostModal}
                                            >
                                                Write a Blog
                                            </Button>
                                        }

                                        <Button
                                            size="large"
                                            style={{
                                                borderRadius: 9,
                                                minWidth: 150,
                                                height: 46,
                                                fontWeight: 800,
                                                borderColor: '#E2E8F0',
                                                boxShadow: '0 8px 18px rgba(15,23,42,.07)'
                                            }}
                                        >
                                            Explore Topics
                                        </Button>

                                    </Space>

                                </Col>

                                <Col xs={24} lg={11}>

                                    <div
                                        style={{
                                            minHeight: 230,
                                            position: 'relative',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >

                                        <div
                                            style={{
                                                position: 'absolute',
                                                width: 360,
                                                height: 210,
                                                borderRadius: '48% 52% 45% 55%',
                                                background: '#FFE5DC',
                                                opacity: .8
                                            }}
                                        />

                                        <div
                                            style={{
                                                position: 'relative',
                                                width: 420,
                                                maxWidth: '100%',
                                                height: 250
                                            }}
                                        >

                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 20,
                                                    bottom: 20,
                                                    width: '86%',
                                                    height: 26,
                                                    background: '#3B2419',
                                                    borderRadius: 8
                                                }}
                                            />

                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 55,
                                                    bottom: 46,
                                                    fontSize: 94,
                                                    lineHeight: 1
                                                }}
                                            >
                                                👨‍💻
                                            </div>

                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 180,
                                                    bottom: 55,
                                                    fontSize: 66,
                                                    lineHeight: 1
                                                }}
                                            >
                                                📖
                                            </div>

                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    right: 25,
                                                    bottom: 54,
                                                    fontSize: 50,
                                                    lineHeight: 1
                                                }}
                                            >
                                                🪴
                                            </div>

                                            {[
                                                {
                                                    text: '✓',
                                                    top: 20,
                                                    left: 40
                                                },
                                                {
                                                    text: '🎓',
                                                    top: 18,
                                                    left: 130
                                                },
                                                {
                                                    text: '⏰',
                                                    top: 20,
                                                    right: 45
                                                },
                                                {
                                                    text: '📊',
                                                    top: 96,
                                                    right: 5
                                                },
                                                {
                                                    text: '📚',
                                                    top: 95,
                                                    left: 0
                                                }
                                            ].map((item, index) => (

                                                <div
                                                    key={index}
                                                    style={{
                                                        position: 'absolute',
                                                        top: item.top,
                                                        left: item.left,
                                                        right: item.right,
                                                        width: 54,
                                                        height: 54,
                                                        borderRadius: 12,
                                                        background: '#FFFFFF',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 8px 24px rgba(15,23,42,.09)',
                                                        color: '#FF2D16',
                                                        fontWeight: 900,
                                                        fontSize: 23
                                                    }}
                                                >
                                                    {item.text}
                                                </div>

                                            ))}

                                        </div>

                                    </div>

                                </Col>

                            </Row>

                        </Card>

                        <Card
                            bordered={false}
                            bodyStyle={{
                                padding: 0
                            }}
                            style={{
                                borderRadius: 0,
                                marginBottom: 18,
                                background: 'transparent',
                                boxShadow: 'none'
                            }}
                        >

                            <Row gutter={[14, 14]}>

                                <Col xs={24} md={9}>

                                    <Input
                                        size="large"
                                        prefix={<SearchOutlined />}
                                        placeholder="Search by title..."
                                        value={searchTitle}
                                        onChange={(e) =>
                                            setSearchTitle(e.target.value)
                                        }
                                        style={{
                                            height: 44,
                                            borderRadius: 8,
                                            borderColor: '#CBD5E1'
                                        }}
                                    />

                                </Col>

                                <Col xs={24} md={12}>

                                    <Input
                                        size="large"
                                        prefix={<FileTextOutlined />}
                                        placeholder="Search by content..."
                                        value={searchContent}
                                        onChange={(e) =>
                                            setSearchContent(e.target.value)
                                        }
                                        style={{
                                            height: 44,
                                            borderRadius: 8,
                                            borderColor: '#CBD5E1'
                                        }}
                                    />

                                </Col>

                                <Col xs={24} md={3}>

                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        style={{
                                            height: 44,
                                            borderRadius: 8,
                                            background: '#FF2D16',
                                            borderColor: '#FF2D16',
                                            fontWeight: 800
                                        }}
                                    >
                                        Search
                                    </Button>

                                    {
                                        props.auth.user?.role === 2 &&

                                        <Button
                                            type="primary"
                                            size="large"
                                            block
                                            style={{
                                                marginTop: 4,
                                                height: 44,
                                                borderRadius: 8,
                                                background: '#FF5A46',
                                                borderColor: '#FF5A46',
                                                fontWeight: 800
                                            }}
                                            onClick={openPostModal}
                                        >
                                            Post a Blog
                                        </Button>
                                    }

                                </Col>

                            </Row>

                        </Card>

                        <Row gutter={[18, 18]}>

                            <Col xs={24} lg={5}>

                                <Card
                                    bordered={false}
                                    bodyStyle={{
                                        padding: 18
                                    }}
                                    style={{
                                        borderRadius: 18,
                                        boxShadow: '0 8px 26px rgba(15,23,42,.055)',
                                        border: '1px solid #EEF2F7'
                                    }}
                                >

                                    <h2
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 900,
                                            color: '#0B1220',
                                            marginBottom: 18
                                        }}
                                    >
                                        Categories
                                    </h2>

                                    {
                                        examSubjects.map((item, index) => {

                                            const active = selectedSubject === item.name;

                                            return (

                                                <div
                                                    key={index}
                                                    onClick={() => setSelectedSubject(item.name)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        padding: '12px 14px',
                                                        marginBottom: 7,
                                                        borderRadius: 10,
                                                        cursor: 'pointer',
                                                        background:
                                                            active
                                                                ? '#FFF1EC'
                                                                : 'transparent',
                                                        transition: '.2s'
                                                    }}
                                                >

                                                    <div
                                                        style={{
                                                            width: 26,
                                                            textAlign: 'center',
                                                            fontSize: 17,
                                                            color: '#FF2D16'
                                                        }}
                                                    >
                                                        {item.icon}
                                                    </div>

                                                    <span
                                                        style={{
                                                            marginLeft: 12,
                                                            fontSize: 14,
                                                            fontWeight: active ? 900 : 700,
                                                            color: active ? '#FF2D16' : '#111827'
                                                        }}
                                                    >
                                                        {item.name}
                                                    </span>

                                                </div>

                                            );

                                        })
                                    }

                                </Card>

                            </Col>

                            <Col xs={24} lg={19}>

                                {
                                    filteredBlogs.length === 0 ?

                                        <Card
                                            style={{
                                                borderRadius: 18,
                                                border: '1px solid #EEF2F7'
                                            }}
                                        >

                                            <div
                                                style={{
                                                    textAlign: 'center',
                                                    padding: 50
                                                }}
                                            >
                                                <Text
                                                    size="20px"
                                                    text="No blogs found"
                                                />
                                            </div>

                                        </Card>

                                        :

                                        <Space
                                            direction="vertical"
                                            size={14}
                                            style={{
                                                width: '100%'
                                            }}
                                        >

                                            {
                                                filteredBlogs.map((item, index) => (

                                                    <Item
                                                        key={index}
                                                        auth={props.auth}
                                                        data={item}
                                                        showDetail={() => {

                                                            setIsDetail(true);

                                                            props.getComments(
                                                                item.email
                                                            );

                                                            setSelectedData(item);

                                                        }}
                                                    />

                                                ))
                                            }

                                        </Space>
                                }

                            </Col>

                        </Row>

                    </div>
            }

        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    blogs: state.blogs
});

export default connect(
    mapStateToProps,
    {
        getBlogs,
        postBlog,
        getComments,
        postComment
    }
)(withRouter(Blogs));
