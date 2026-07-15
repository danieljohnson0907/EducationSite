import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { RocketOutlined, TeamOutlined } from '@ant-design/icons';

export default function Slide() {
    return (
        <section className="gm-hero">
            {/* ── Left: content ── */}
            <div className="gm-hero__content">
                <span className="gm-hero__eyebrow">Your Success, Our Mission</span>

                <h1 className="gm-hero__title">
                    Pass Your Exams<br />
                    "Take My Exam"<br/>
                    With <span>Confidence</span>
                </h1>

                <p className="gm-hero__desc">
                    Expert guidance, study resources, and academic support
                    designed to help students achieve their academic goals.
                </p>

                <div className="gm-hero__actions">
                    <Link to="/experts" className="gm-hero__btn-primary">
                        <RocketOutlined /> Get Started
                    </Link>
                    <Link to="/experts" className="gm-hero__btn-outline">
                        <TeamOutlined /> Find Experts
                    </Link>
                </div>

                {/* <div className="gm-hero__trust">
                    <div className="gm-hero__trust-avatars">
                        {[1,2,3,4,5].map(i => (
                            <Avatar key={i} size={32} style={{ background: '#FF6B35', fontSize: 12 }}>
                                {String.fromCharCode(64 + i)}
                            </Avatar>
                        ))}
                    </div>
                    <span><strong>2,000+</strong> Students Trust GoalMindset</span>
                </div> */}
            </div>

            {/* ── Right: image ── */}
            <div className="gm-hero__image">
                <div className="gm-hero__image-blob"></div>

                <img
                    src="/assets/img/hero.png"
                    alt="Students studying together"
                />
            </div>
            
        </section>
    );
}
