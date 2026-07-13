import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom/cjs/react-router-dom'
import { getHomeStates } from '../../redux/actions/homeAction'
import PreLine from './pre-line'
import MainBody from './main-body'
import './aboutus.css'

function AboutUs(props) {
    useEffect(() => {
        props.getHomeStates()
    }, [])

    return (
        <div>
            
            <MainBody />
        </div>
    )
}

const mapStateToProps = (state) => ({
    home: state.home,
})

export default connect(mapStateToProps, { getHomeStates })(withRouter(AboutUs))
