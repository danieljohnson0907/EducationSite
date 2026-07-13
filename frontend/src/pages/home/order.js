import React from "react";
import { Row, Col, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

function Order() {
    return (
        <div
            style={{
                background: "#001529",
                borderRadius: 12,
                padding: "40px",
                margin: "50px 20px",
                color: "#fff"
            }}
        >
            <Row align="middle" gutter={[24, 24]}>
                <Col xs={24} md={18}>
                    <h1 style={{ color: "#fff" }}>
                        Ready to Achieve Your Academic Goals?
                    </h1>

                    <p style={{ color: "#ddd" }}>
                        Join thousands of students who are already succeeding
                        with GoalMindset.
                    </p>
                </Col>

                <Col xs={24} md={6} style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        size="large"
                        icon={<ArrowRightOutlined />}
                    >
                        Get Started Now
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Order;