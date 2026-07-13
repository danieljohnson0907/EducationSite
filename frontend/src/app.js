import React from 'react';
import 'antd/dist/antd.css'; //All logics are stared from this code. need to import the antd css in this file.
// import 'antd/dist/antd.dark.css';
import jwt_decode from 'jwt-decode'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';
import Header from './pages/layouts/header';
import Footer from './pages/layouts/footer';
import { setAuthToken } from './utils/setAuthToken';
import store from './redux/store';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import Home from './pages/home';
import AboutUs from './pages/aboutus';
import Blogs from './pages/blogs';
import "./pages/layouts/styles.css";
import ChatWidget from './components/ChatWidget';
import Experts from './pages/experts';
import Profile from './pages/profile';
import Users from './pages/admin/users';
import Message from './pages/message';
import Advice from './pages/admin/advice';
import AdminExpert from './pages/admin/expert';
import AdminUser from './pages/admin/users';
import orders from './pages/admin/orders';
import Container from './pages/layouts/container';

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
                        <Switch>
                            <Route exact path="/" component={Home} />
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
                            <Route exact path="/admin/user" component={AdminUser} />
                        </Switch>
                        <Switch>
                            <Route exact path="/admin/orders" component={orders} />
                        </Switch>
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