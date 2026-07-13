import React, { useState } from 'react'
import { Button, Rate } from 'antd'
import {
    AimOutlined,
    SafetyCertificateOutlined,
    StarOutlined,
    PhoneOutlined,
    RocketOutlined,
    TeamOutlined,
    BookOutlined,
    ThunderboltOutlined,
    CheckCircleFilled,
    SendOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { sendReviewRate } from '../../redux/actions/profileAction'

function MainBody(props) {
    const [review, setReview] = useState(0)

    const onSendReview = () => {
        props.sendReviewRate(review)
    }

    return (
        <div className="about-us-page">

            {/* HEADER */}
            <div className="au-header-wrap">
                <div className="au-container">
                    <div className="preline-header">
                        <a href="/">Home</a>
                        <span>/</span>
                        <span className="current-page">About Us</span>
                    </div>

                    <div className="au-page-heading">
                        <h1>About Us</h1>
                        <div className="au-heading-underline" />
                    </div>
                </div>
            </div>

            {/* HERO */}
            <div className="au-main-wrap">
                <div className="au-container">

                    <section className="au-hero">
                        <div className="au-hero-text">
                            <h2>The New Way to Success</h2>

                            <p>
                                Online exams today come with strict rules, time limits, and high
                                expectations. Many students feel overwhelmed when balancing
                                multiple subjects, deadlines, and complex requirements at the
                                same time.
                            </p>

                            <p>
                                At GoalMindset, we make this journey easier and more structured.
                                Our academic support system is designed to help students
                                understand concepts clearly, reduce stress, and improve performance
                                step by step.
                            </p>

                            <p>
                                We focus on accuracy, professionalism, and complete confidentiality,
                                so students can stay confident while achieving better results in
                                their studies.
                            </p>
                        </div>

                        <div className="au-hero-image">
                            <img
                                src="/assets/img/about-us-1.jpg"
                                alt="Online exam support"
                            />
                        </div>
                    </section>

                    {/* CARDS */}
                    <section className="au-cards-row">
                        <div className="au-card">
                            <AimOutlined className="au-icon blue" />
                            <div className="au-card-body">
                                <h3>Our Mission</h3>
                                <p>
                                    To guide students through structured academic support,
                                    helping them succeed in online exams with confidence,
                                    clarity, and reliable assistance whenever needed.
                                </p>
                            </div>
                        </div>

                        <div className="au-card">
                            <SafetyCertificateOutlined className="au-icon green" />
                            <div className="au-card-body">
                                <h3>Our Vision</h3>
                                <p>
                                    To become a trusted global platform for academic assistance,
                                    empowering students to learn smarter and achieve consistent
                                    success across all major subjects and exam systems.
                                </p>
                            </div>
                        </div>

                        <div className="au-card">
                            <StarOutlined className="au-icon orange" />
                            <div className="au-card-body">
                                <h3>Our Promise</h3>
                                <p>
                                    We promise accuracy, privacy, and timely support. Every student
                                    receives dedicated attention and reliable guidance to ensure
                                    better learning outcomes.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* TRUST */}
                    <section className="au-trust">
                        <div className="au-trust-image">
                            <img src="/assets/img/about-us-2.jpg" alt="Student learning" />
                        </div>

                        <div className="au-trust-content">
                            <h2>Why Students Trust Us</h2>

                            <p>
                                Students choose GoalMindset because we provide consistent,
                                high-quality academic support tailored to individual learning needs.
                                Our focus is not just answers, but real understanding and improvement.
                            </p>

                            <ul className="au-trust-list">
                                <li><CheckCircleFilled /> Experts with strong academic backgrounds</li>
                                <li><CheckCircleFilled /> Secure and confidential process</li>
                                <li><CheckCircleFilled /> Fast 24/7 support anytime you need</li>
                                <li><CheckCircleFilled /> Focus on quality learning and results</li>
                            </ul>

                            <div className="au-contact-wrap">
                                <Button
                                    type="primary"
                                    icon={<PhoneOutlined />}
                                    className="au-contact-btn"
                                >
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* EXTRA SECTION */}
                    <section className="au-extra-section">
                        <div className="au-extra-text">
                            <h2>Smarter Online Learning Support</h2>

                            <p>
                                We provide structured academic assistance designed to help students
                                improve understanding, build confidence, and perform better in exams.
                                Our approach focuses on clarity rather than pressure.
                            </p>

                            <p>
                                Whether you are struggling with complex topics or need regular guidance,
                                our system ensures you always have access to reliable learning support
                                whenever you need it.
                            </p>

                            <div className="au-feature-grid">
                                <div className="au-feature">
                                    <RocketOutlined />
                                    <span>
                                        <strong>Step-by-step</strong>
                                        <small>learning approach</small>
                                    </span>
                                </div>

                                <div className="au-feature">
                                    <TeamOutlined />
                                    <span>
                                        <strong>Personalized</strong>
                                        <small>academic assistance</small>
                                    </span>
                                </div>

                                <div className="au-feature">
                                    <BookOutlined />
                                    <span>
                                        <strong>Practice-based</strong>
                                        <small>improvement</small>
                                    </span>
                                </div>

                                <div className="au-feature">
                                    <ThunderboltOutlined />
                                    <span>
                                        <strong>Fast response</strong>
                                        <small>support team</small>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="au-extra-img">
                            <img
                                src="/assets/img/about-us-3.jpg"
                                alt="Smarter online learning support"
                            />
                        </div>
                    </section>
                </div>
            </div>

            {/* BOTTOM REVIEW */}
            <div className="au-bottom-wrap">
                <div className="au-container">
                    <div className="au-stats-banner">
                        <h3>Thousands of students trust us every day</h3>
                        <p>
                            Join a growing academic support community focused on smarter learning and better results.
                        </p>
                    </div>

                    <div className="au-review-section">
                        <div className="au-review-left">
                            <div className="au-review-icon">
                                <StarOutlined />
                            </div>

                            <div>
                                <span className="au-review-label">
                                    Share your experience with us:
                                </span>
                                <p>Your feedback helps us improve our academic support quality.</p>
                            </div>
                        </div>

                        <Rate
                            allowHalf
                            value={review}
                            onChange={(val) => setReview(val)}
                            className="au-review-rate"
                        />

                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            className="au-review-send-btn"
                            onClick={onSendReview}
                        >
                            Send Review
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default connect(null, { sendReviewRate })(MainBody)
