import React from "react";
import { Row, Col, Typography, Divider } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  RightOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

const ORANGE = "#e85d26";
const DARK = "#111827";
const DARK_CARD = "#182235";
const TEXT = "#9ca3af";
const WHITE = "#ffffff";

const navLinks = [
  { label: "Home", href: "/take-my-exam" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "Experts", href: "/experts" },
  { label: "Messages", href: "/messages" },
];

const contactInfo = [
  { icon: <MailOutlined />, text: "Telegram: @high_sky_future" },
  { icon: <MailOutlined />, text: "Teams: stanlywilliam797@outlook.com" }, 
  // { icon: <PhoneOutlined />, text: "+44 78 2757 6965" },
  {
    icon: <EnvironmentOutlined />,
    text: "Discord group: https://discord.gg/pYKtmMnpg",
  },
];

const FooterLink = ({ label, href }) => (
  <a
    href={href}
    style={{
      color: TEXT,
      fontSize: 14,
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 12,
      transition: "all 0.2s ease",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = ORANGE;
      e.currentTarget.style.transform = "translateX(4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = TEXT;
      e.currentTarget.style.transform = "translateX(0)";
    }}
  >
    <RightOutlined style={{ fontSize: 10 }} />
    {label}
  </a>
);

const Footer = () => {
  return (
    <footer
      style={{
        background: `linear-gradient(180deg, ${DARK} 0%, #0b1120 100%)`,
        color: TEXT,
      
      }}
    >
      <div
        style={{
          height: 4,
          background: ORANGE,
          width: "100%",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 24px 0",
        }}
      >
        <Row gutter={[48, 40]}>
          <Col xs={24} md={10} lg={10}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  background: ORANGE,
                  borderRadius: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 12px 28px rgba(232, 93, 38, 0.35)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>

              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: WHITE,
                  letterSpacing: 0.2,
                }}
              >
                Goal<span style={{ color: ORANGE }}>Mindset</span>
              </span>
            </div>

            <Text
              style={{
                color: TEXT,
                fontSize: 15,
                lineHeight: 1.8,
                display: "block",
                maxWidth: 420,
              }}
            >
              Empowering students to achieve academic success through expert
              guidance, useful learning support, and quality resources.
            </Text>
          </Col>

          <Col xs={24} sm={10} md={6} lg={5}>
            <h3
              style={{
                color: WHITE,
                fontSize: 17,
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Quick Links
            </h3>

            {navLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </Col>
                    <Col xs={24} sm={14} md={8} lg={9}>
            <div
              style={{
                background: DARK_CARD,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                padding: 24,
                boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
              }}
            >
              <h3
                style={{
                  color: WHITE,
                  fontSize: 17,
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                Contact Us
              </h3>

              {contactInfo.map(({ icon, text }) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "rgba(232, 93, 38, 0.14)",
                      color: ORANGE,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 16,
                    }}
                  >
                    {icon}
                  </div>

                  <span
                    style={{
                      color: TEXT,
                      fontSize: 14,
                      lineHeight: 2.3,
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </Col>
        </Row>

        <Divider
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            margin: "44px 0 0",
          }}
        />

        <div
          style={{
            padding: "20px 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Text style={{ color: TEXT, fontSize: 13 }}>
            © 2026 GoalMindset. All Rights Reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;