import React from 'react';
import { TeamOutlined, SafetyOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
 
export default function States({ count, average_review }) {
    const stats = [
        {
            icon: <TeamOutlined />,
            colorClass: 'gm-stats__icon--orange',
            value: count.student,
            label: 'Students Supported',
        },
        {
            icon: <SafetyOutlined />,
            colorClass: 'gm-stats__icon--green',
            value: '98%',
            label: 'Success Rate',
        },
        {
            icon: <StarOutlined />,
            colorClass: 'gm-stats__icon--blue',
            value: average_review || '4.8',
            label: 'Student Rating',
        },
        {
            icon: <UserOutlined />,
            colorClass: 'gm-stats__icon--purple',
            value: count.expert,
            label: 'Expert Mentors',
        },
    ];
 
    return (
        <div className="gm-stats">
            {stats.map((item, i) => (
                <React.Fragment key={i}>
                    <div className="gm-stats__item">
                        <div className={`gm-stats__icon ${item.colorClass}`}>
                            {item.icon}
                        </div>
                        <div>
                            <div className="gm-stats__value">{item.value}</div>
                            <div className="gm-stats__label">{item.label}</div>
                        </div>
                    </div>
                    {i < stats.length - 1 && <div className="gm-stats__divider" />}
                </React.Fragment>
            ))}
        </div>
    );
}