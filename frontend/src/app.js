import React, { lazy, Suspense } from 'react';
import 'antd/dist/antd.css'; //All logics are stared from this code. need to import the antd css in this file.
// import 'antd/dist/antd.dark.css';
import jwt_decode from 'jwt-decode'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout, Spin } from 'antd';
import Header from './pages/layouts/header';
import Footer from './pages/layouts/footer';
import { setAuthToken } from './utils/setAuthToken';
import store from './redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import "./pages/layouts/styles.css";
import ChatWidget from './components/ChatWidget';
import Container from './pages/layouts/container';

const Home = lazy(() => import('./pages/home'));
const AboutUs = lazy(() => import('./pages/aboutus'));
const Blogs = lazy(() => import('./pages/blogs'));
const Experts = lazy(() => import('./pages/experts'));
const Profile = lazy(() => import('./pages/profile'));
const Users = lazy(() => import('./pages/admin/users'));
const Message = lazy(() => import('./pages/message'));
const Advice = lazy(() => import('./pages/admin/advice'));
const AdminExpert = lazy(() => import('./pages/admin/expert'));
const orders = lazy(() => import('./pages/admin/orders'));

const RouteFallback = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <Spin size="large" />
    </div>
);

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);

    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
    }
}
function App() {
    return (
        
        <Provider store={store}>
            <Router>
                <Layout
                    style={{
                        display: 'flex',
                        flexDirection: 'colum',
                        justifyContent: 'space-between',
                        height: "100vh"
                    }}
                >
                   
                    <Header />
                    <ChatWidget />
                    
                    <Container
                    >
                        <Suspense fallback={<RouteFallback />}>
                            <Switch>
                                <Route exact path="/take-my-exam" component={Home} />
                            </Switch>
                            <Switch>
                                <Route exact path="/aboutus" component={AboutUs} />
                            </Switch>
                            <Switch>
                                <Route exact path="/blogs" component={Blogs} />
                            </Switch>
                            <Switch>
                                <Route exact path="/experts" component={Experts} />
                            </Switch>
                            <Switch>
                                <Route exact path="/profile" component={Profile} />
                            </Switch>
                            <Switch>
                                <Route exact path="/admin/users" component={Users} />
                            </Switch>
                            <Switch>
                                <Route exact path="/messages" component={Message} />
                            </Switch>
                            <Switch>
                                <Route exact path="/admin/advice" component={Advice} />
                            </Switch>
                            <Switch>
                                <Route exact path="/admin/expert" component={AdminExpert} />
                            </Switch>
                            <Switch>
                                <Route exact path="/admin/user" component={Users} />
                            </Switch>
                            <Switch>
                                <Route exact path="/admin/orders" component={orders} />
                            </Switch>
                        </Suspense>
                    </Container>
                    <div>
                        <Footer />
                    </div>
                </Layout>
            </Router>
        </Provider>
    )
}

export default App;