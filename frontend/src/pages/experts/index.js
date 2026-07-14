import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Search from './search';
import ExpertCard from './expert_card';
import { getExpertsSearch } from '../../redux/actions/expertsAction';

function Experts(props) {

    const [searchForm, setSearchForm] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        props.getExpertsSearch();
    }, []);

    const onSearch = () => {
        props.getExpertsSearch(searchForm);
    };

    return (
        <div
            style={{
                background: '#f8fafc',
                minHeight: '100vh',
                padding: '20px 20px'
            }}
        >

            <div
                style={{
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}
            >

                {/* HEADER */}

                <div
                    style={{
                        marginBottom: '30px'
                    }}
                >

                    <h1
                        style={{
                            fontSize: '42px',
                            fontWeight: '700',
                            color: '#1A1F36',
                            marginBottom: '10px'
                        }}
                    >
                        Our Expert Mentors
                    </h1>

                    <p
                        style={{
                            color: '#64748b',
                            fontSize: '16px'
                        }}
                    >
                        Learn from experienced professionals who are here to guide you.
                    </p>

                </div>

                {/* SEARCH CARD */}

                <Card
                    style={{
                        marginBottom: '35px',
                        borderRadius: '18px',
                        border: 'none',
                        boxShadow: '0 8px 30px rgba(0,0,0,.06)'
                    }}
                >

                    <Search
                        search={searchForm}
                        onSearch={onSearch}
                        setSearchForm={setSearchForm}
                    />

                </Card>

                {/* EXPERT LIST */}

                <Row gutter={[24, 24]}>

                    {
                        props.experts.data &&
                        props.experts.data.map((item, index) => (

                            <Col
                                key={index}
                                xs={24}
                                sm={12}
                                md={12}
                                lg={6}
                            >

                                <ExpertCard
                                    data={item}
                                />

                            </Col>

                        ))
                    }

                </Row>

                {/* CTA SECTION */}

                <Card
                    style={{
                        marginTop: '40px',
                        borderRadius: '20px',
                        background: '#0F2D63',
                        border: 'none',
                        overflow: 'hidden'
                    }}
                    bodyStyle={{
                        padding: '35px'
                    }}
                >

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap'
                        }}
                    >

                        <div>

                            <h2
                                style={{
                                    color: '#fff',
                                    marginBottom: '10px'
                                }}
                            >
                                Become a Mentor
                            </h2>

                            <p
                                style={{
                                    color: '#dbeafe',
                                    margin: 0
                                }}
                            >
                                Share your knowledge and help thousands of students succeed.
                            </p>

                        </div>

                        <button
                            style={{
                                marginTop: '15px',
                                background: '#FF6B35',
                                color: '#fff',
                                border: 'none',
                                padding: '14px 28px',
                                borderRadius: '999px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Join as Mentor →
                        </button>

                    </div>

                </Card>

                {/* FOOTER */}

                <div
                    style={{
                        marginTop: '25px',
                        textAlign: 'center',
                        color: '#64748b',
                        fontSize: '14px'
                    }}
                >
                    © 2026 GoalMindset. All Rights Reserved.
                </div>

            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    experts: state.experts
});

export default connect(
    mapStateToProps,
    {
        getExpertsSearch
    }
)(withRouter(Experts));