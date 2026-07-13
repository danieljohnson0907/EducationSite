import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Avatar, Image, Space, Menu } from 'antd';
import { UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import AuthModal from '../../components/AuthModal';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { logoutUser } from '../../redux/actions/authActions';
import { ADMIN_MENU_ITEMS, USER_MENU_ITEMS } from '../../config/const';
import { setPagePath } from '../../redux/actions/homeAction';
import { getAvatarUrl } from '../../utils/global';
import './styles.css';

function Header(props) {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [authType, setAuthType] = useState('login');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        let page_path = localStorage.getItem('page_path');
        if (!page_path) {
            props.setPagePath('/');
        } else {
            page_path = window.location.pathname;
            props.setPagePath(page_path);
        }
    }, []);

    const menuItems = props.auth?.user?.role === 2 ? ADMIN_MENU_ITEMS : USER_MENU_ITEMS;

    const userOverlay = props.auth.isAuthenticated ? (
        <Menu className="gm-dropdown-menu">
            {/* <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
            </Menu.Item> */}
            <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={() => {
                    store.dispatch(logoutUser());
                    window.location.href = '/';
                }}
            >
                Logout
            </Menu.Item>
        </Menu>
    ) : (
        <Menu className="gm-dropdown-menu">
            <Menu.Item
                key="login"
                icon={<UserOutlined />}
                onClick={() => {
                    setAuthType('login');
                    setIsOpenModal(true);
                }}
            >
                Login
            </Menu.Item>
            <Menu.Item
                key="register"
                icon={<UserAddOutlined />}
                onClick={() => {
                    setAuthType('register');
                    setIsOpenModal(true);
                }}
            >
                Register
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <AuthModal
                isOpen={isOpenModal}
                type={authType}
                onCancel={() => setIsOpenModal(false)}
            />

            <header className="gm-header">
                <div className="gm-header__inner">

                    {/* ── Logo only (no text) ── */}
                    <Link to="/" className="gm-header__logo" onClick={() => props.setPagePath('/')}>
                        <Image
                            src="/assets/img/logo.png"
                            preview={false}
                            width={56}
                            className="gm-header__logo-img"
                        />
                    </Link>

                    {/* ── Spacer pushes nav + avatar to the right ── */}
                    <div className="gm-header__spacer" />

                    {/* ── Desktop Nav ── */}
                    <nav className="gm-header__nav">
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.path}
                                path={item.path}
                                label={item.label}
                                onClick={() => props.setPagePath(item.path)}
                                selected={props.home.page_path === item.path}
                            />
                        ))}
                    </nav>

                    {/* ── Avatar Dropdown ── */}
                    <Space className="gm-header__right">
                        <Dropdown overlay={userOverlay} trigger={["click"]} placement="bottomRight">
                            <button className="gm-header__avatar-btn" aria-label="Account menu">
                                {props.auth.isAuthenticated ? (
                                    <Avatar
                                    size={38}
                                    src={getAvatarUrl(props.auth.user)}
                                    icon={<UserOutlined />}
                                    className="gm-header__avatar"
                                    />
                                ) : (
                                    <Avatar
                                    size={38}
                                    icon={<UserOutlined />}
                                    className="gm-header__avatar gm-header__avatar--guest"
                                    />
                                )}

                                <svg
                                    className="gm-header__chevron"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                >
                                    <path
                                    d="M2 4l4 4 4-4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </Dropdown>
                     </Space>

                    {/* ── Mobile Hamburger ── */}
                    <button
                        className={`gm-header__hamburger ${mobileOpen ? 'open' : ''}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span /><span /><span />
                    </button>
                </div>

                {/* ── Mobile Nav Drawer ── */}
                {mobileOpen && (
                    <nav className="gm-header__mobile-nav">
                        {menuItems.map((item) => (
                            <MenuItem
                                key={item.path}
                                path={item.path}
                                label={item.label}
                                onClick={() => {
                                    props.setPagePath(item.path);
                                    setMobileOpen(false);
                                }}
                                selected={props.home.page_path === item.path}
                            />
                        ))}
                        {!props.auth.isAuthenticated && (
                            <div className="gm-header__mobile-auth">
                                <button
                                    className="gm-btn gm-btn--outline"
                                    onClick={() => { setAuthType('login'); setIsOpenModal(true); setMobileOpen(false); }}
                                >
                                    Login
                                </button>
                                <button
                                    className="gm-btn gm-btn--primary"
                                    onClick={() => { setAuthType('register'); setIsOpenModal(true); setMobileOpen(false); }}
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </nav>
                )}
            </header>
        </>
    );
}

/* ── Sub-components ── */

export const MenuItem = ({ path, label, onClick, selected }) => (
    <Link
        to={path}
        onClick={onClick}
        className={`gm-nav-item ${selected ? 'gm-nav-item--active' : ''}`}
    >
        {label}
    </Link>
);

/* ── Redux ── */

const mapStateToProps = (state) => ({
    auth: state.auth,
    home: state.home,
});

export default connect(mapStateToProps, { setPagePath })(Header);
