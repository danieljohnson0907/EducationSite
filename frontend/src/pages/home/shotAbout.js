import React from "react";
import { Row, Col, Card } from "antd";
import {
    TeamOutlined,
    BookOutlined,
    CalendarOutlined,
    CustomerServiceOutlined
} from "@ant-design/icons";

export default function ShotAbout() {
    const features = [
        {
            icon: <TeamOutlined />,
            title: "Expert Guidance",
            desc: "Connect with experienced mentors who provide personalized support."
        },
        {
            icon: <CalendarOutlined />,
            title: "Flexible Learning",
            desc: "Learn at your own pace with flexible scheduling."
        },
        {
            icon: <BookOutlined />,
            title: "Academic Resources",
            desc: "Access study materials, guides, and practice tests."
        },
        {
            icon: <CustomerServiceOutlined />,
            title: "Student Support",
            desc: "Get help whenever you need it from our support team."
        }
    ];

    return (
        <div style={{ padding: "60px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
                <h1>Why Students Choose GoalMindset</h1>
                <p>
                    We provide the support and resources you need to succeed.
                </p>
            </div>

            <Row gutter={[24, 24]}>
                {features.map((item, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card hoverable>
                            <div
                                style={{
                                    fontSize: 40,
                                    textAlign: "center",
                                    marginBottom: 15
                                }}
                            >
                                {item.icon}
                            </div>

                            <h3 style={{ textAlign: "center" }}>
                                {item.title}
                            </h3>

                            <p style={{ textAlign: "center" }}>
                                {item.desc}
                            </p>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}