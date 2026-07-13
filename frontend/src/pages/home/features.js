import React from 'react';
import { TeamOutlined, CalendarOutlined, ReadOutlined, CustomerServiceOutlined } from '@ant-design/icons';
 
const FEATURES = [
    {
        icon: <TeamOutlined />,
        colorClass: 'gm-feature-card__icon--orange',
        title: 'Expert Guidance',
        desc: 'Connect with experienced mentors who provide personalized support.',
    },
    {
        icon: <CalendarOutlined />,
        colorClass: 'gm-feature-card__icon--green',
        title: 'Flexible Learning',
        desc: 'Learn at your own pace with flexible scheduling that fits your lifestyle.',
    },
    {
        icon: <ReadOutlined />,
        colorClass: 'gm-feature-card__icon--blue',
        title: 'Academic Resources',
        desc: 'Access a wide range of study materials, guides, and practice tests.',
    },
    {
        icon: <CustomerServiceOutlined />,
        colorClass: 'gm-feature-card__icon--purple',
        title: 'Student Support',
        desc: 'Get help whenever you need it from our dedicated support team.',
    },
];
 
export default function Features() {
    return (
        <section className="gm-features">
            <div className="gm-section-header">
                <h2>Why Students Choose GoalMindset</h2>
                <p>We provide the support and resources you need to succeed.</p>
            </div>
 
            <div className="gm-features__grid">
                {FEATURES.map((f, i) => (
                    <div className="gm-feature-card" key={i}>
                        <div className={`gm-feature-card__icon ${f.colorClass}`}>
                            {f.icon}
                        </div>
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}