import React, { useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHomeStates } from '../../redux/actions/homeAction';
import { ArrowRightOutlined } from '@ant-design/icons';
import Slide from './slide';
import States from './states';
import Features from './features';
import Recommand from './recommand';
import './styles.css';

function Home(props) {
    useEffect(() => {
        props.getHomeStates();
    }, []);

    return (
        <div>
            {/* Hero */}
            <Slide />

            {/* Stats bar */}
            <States
                count={props.home.count}
                average_review={props.home.average_review}
            />

            {/* Why choose us */}
            <Features />

            {/* Featured experts */}
            <Recommand
                students={props.home.recommand?.students || []}
                experts={props.home.recommand?.experts || []}
            />

            {/* CTA Banner */}
            <div style={{ padding: '0 24px 64px' }}>
                <div className="gm-cta">
                    <div className="gm-cta__left">
                        <span className="gm-cta__icon">🎓</span>
                        <div>
                            <h2>Ready to Achieve Your Academic Goals?</h2>
                            <p>Join thousands of students who are already succeeding with GoalMindset.</p>
                        </div>
                    </div>
                    <Link to="/experts" className="gm-cta__btn">
                        Get Started Now <ArrowRightOutlined />
                    </Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    home: state.home,
});

export default connect(mapStateToProps, { getHomeStates })(withRouter(Home));
