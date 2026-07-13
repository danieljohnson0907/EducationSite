import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';
import { StarFilled, ArrowRightOutlined } from '@ant-design/icons';
 
export default function Recommand({ students = [], experts = [] }) {
    // Merge experts + students, show up to 3
    const featured = [...experts, ...students].slice(0, 3);
 
    if (!featured.length) return null;
 
    return (
        <section style={{ padding: '0 24px' }}>
            {/* <div className="gm-experts">
                <div className="gm-experts__header">
                    <h2>Featured Experts</h2>
                    <Link to="/experts" className="gm-experts__view-all">
                        View All Experts <ArrowRightOutlined />
                    </Link>
                </div>
 
                <div className="gm-experts__grid">
                    {featured.map((item, i) => (
                        <ExpertCard key={item._id || i} data={item} />
                    ))}
                </div>
            </div> */}
        </section>
    );
}
 
function ExpertCard({ data }) {
    const stars = Math.round(data.rating || 4.8);
 
    return (
        <div className="gm-expert-card">
            <div className="gm-expert-card__top">
                <div className="gm-expert-card__avatar-wrap">
                    <Avatar
                        size={56}
                        src={data.avatar}
                        style={{ background: '#FF6B35', fontSize: 20 }}
                    >
                        {data.name?.[0]}
                    </Avatar>
                    <span className="gm-expert-card__online" />
                </div>
                <div>
                    <p className="gm-expert-card__name">{data.name}</p>
                    <p className="gm-expert-card__subject">{data.subject || data.email}</p>
                    <div className="gm-expert-card__stars">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarFilled key={i} style={{ color: i < stars ? '#F59E0B' : '#E5E7EB' }} />
                        ))}
                        <span style={{ color: '#6B7280', marginLeft: 4, fontSize: 12 }}>
                            {data.rating || '4.8'} ({data.reviews || 0} reviews)
                        </span>
                    </div>
                </div>
            </div>
 
            <div className="gm-expert-card__actions">
                <Link to={`/experts/${data._id}`} className="gm-expert-card__btn-outline">
                    View Profile
                </Link>
                <Link to={`/experts/${data._id}/hire`} className="gm-expert-card__btn-primary">
                    Hire Expert
                </Link>
            </div>
        </div>
    );
}
 
export { ExpertCard };
 