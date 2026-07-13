import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Nav from './nav';
import Information from './information';
import ToExpert from './to_expert';
import Orders from './orders';
function Profile(){
    const [selectedMenu, setSelectedMenu] = useState("information");
    function renderPage() {
        if(selectedMenu === "information") {
            return <Information />
        } else if (selectedMenu === "to_expert"){
            return <ToExpert/>
        } else if (selectedMenu === "orders"){
            return <Orders />
        } 
    }
    return (
        <Row>
            <Col md={{span: 6}} sm={{span: 24}}>
                <Nav 
                    selectedMenu={selectedMenu}
                    setSelectedMenu={setSelectedMenu}
                />
            </Col>
            <Col md={{span: 18}} sm={{span: 24}}>
                {
                    renderPage()
                }
            </Col>
            
        </Row>
    )
}

export default Profile;