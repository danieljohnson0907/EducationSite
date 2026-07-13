import React from 'react';
import { connect } from 'react-redux';
function Container(props) {
    return (
        <div className={`
            layout-container ${
                props.home.page_path === "/messages" || 
                props.home.page_path === "/advice" ||
                props.home.page_path === "/admin/advice" 
                ? 'fixed-layout full-width' : ''}`}>
            {props.children}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        home: state.home,
    }
}
export default connect(mapStateToProps, {
    
})(Container);