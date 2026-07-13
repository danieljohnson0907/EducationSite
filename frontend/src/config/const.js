export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ed-mybackend-production.up.railway.app';

export const USER_MENU_ITEMS = [
    { label: 'Home', path: '/' }, 
    { label: 'About Us', path: '/aboutus' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Experts', path: '/experts' },
    { label: 'Messages', path: '/messages' },
];

export const ADMIN_MENU_ITEMS = [
    { label: 'Home', path: '/' }, 
    { label: 'Advice', path: '/admin/advice' },
    { label: 'Expert', path: '/admin/expert' },
    { label: 'User', path: '/admin/user' },
    { label: 'Orders', path: '/admin/orders' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Messages', path: '/messages' },
];

export const SOCKET_PORT = 5000;
