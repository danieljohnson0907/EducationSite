import React from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Text from '../../components/Text';

function Nav(props) {
    return (
        <>
            <Menu mode="vertical" selectedKeys={[props.selectedMenu]}
            >
                <Menu.Item key="information">
                    <Text
                        text="Information"
                        size={17}
                        onClick={() => {
                            props.setSelectedMenu("information")
                        }}
                    />
                </Menu.Item>
                <Menu.Item key="status">
                    <Text
                        text="Status"
                        size={17}
                        onClick={() => {
                            props.setSelectedMenu("status")
                        }}
                    />
                </Menu.Item>
                {
                    props.auth.user?.type != "expert" ?
                        <Menu.Item key="to_export">
                            <Text
                                text="To be Export"
                                size={17}
                                onClick={() => {
                                    props.setSelectedMenu("to_expert")
                                }}
                            />
                        </Menu.Item> : <></>
                }
                <Menu.Item key="orders">
                    <Text
                        text="Orders"
                        size={17}
                        onClick={() => {
                            props.setSelectedMenu("orders")
                        }}
                    />
                </Menu.Item>
                <Menu.Item key="chargeMoney">
                    <Text
                        text="Charge Money"
                        size={17}
                        onClick={() => {
                            props.setSelectedMenu("chargeMoney")
                        }}
                    />
                </Menu.Item>
            </Menu>
        </>
    )
}


const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(withRouter(Nav));