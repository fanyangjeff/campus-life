import React from "react";
import {Layout, Menu, Button} from 'antd';
import {NavLink} from "react-router-dom";
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css";
import BigProfile from "./icons/BigProfile.png";
import Login from "../Login/LoginPage";
import Logout from '../Logout/Logout'
import store from '../../store/Store'
import EmailVerification from "../Login/EmailVerification/EmailVerification";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class SideBar extends React.Component {
    state = {
        collapsed: false,
        showPopUPLogin: false,
        isEmailVerification: false,
        userName: 'Guest',
        isLoggedIn: false
    };

    componentDidMount() {
        store.subscribe(() => {
            const {userName, isLoggedIn} = store.getState()
            this.setState({userName, isLoggedIn})
        })
    }

    onTogglePopup = () => {
        this.setState((prevState) => {
            return {
                showPopUPLogin: !prevState.showPopUPLogin,
            }
        })
    }
    // EmailVerification
    onToggleEmailVerification = () => {
        this.setState((prevState) => {
            return {
                showPopUPLogin: !prevState.showPopUPLogin,
                isEmailVerification: !prevState.isEmailVerification,
            }
        })
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    updateUserName = () => {

    }

    render() {
        const {collapsed} = this.state;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider
                    width="283px"
                    style={{
                        height: "100vh",
                        left: 0,
                        top: 0,
                        position: "sticky",
                        textAlign: "center",
                    }}
                >
                    <div>
                        <NavLink to="/profile">
                            <img
                                src={BigProfile ? BigProfile : null}
                                style={{
                                    //marginTop: "100px",
                                    width: "78px",
                                    height: "78px",
                                    borderRadius: "39px",
                                    marginTop: "40px",
                                    marginBottom: "30px"
                                }}
                                alt="default profile pic"
                            />
                        </NavLink>
                    </div>
                    <div>
                        <Button
                            id="loginButton"
                            type="primary"
                            style={{
                                backgroundColor: "white",
                                borderColor: "white",
                                width: "167px",
                                fontSize: "16px",
                                fontFamily: "BasicSans",
                                height: "34px",
                                color: "black",
                                marginBottom: "20px",
                                display: "inline"
                            }}
                            onClick={this.onTogglePopup}
                        >
                            {this.state.isLoggedIn ? this.state.userName : 'Log In / Sign Up'}
                        </Button>
                        {this.state.showPopUPLogin && !this.state.isLoggedIn?
                            <Login closePopup={this.onTogglePopup} onToggleEmailVerification={this.onToggleEmailVerification}
                            /> : null}
                        
                        {this.state.showPopUPLogin && this.state.isLoggedIn?
                            <Logout closePopup={this.onTogglePopup}/>:null
                        }

                        {this.state.isEmailVerification ?
                            <EmailVerification closePopup={this.onToggleEmailVerification}
                            /> : null}
                    </div>
                    <div>
                        <NavLink to="/posts/create">
                            <Button
                                type="primary"
                                style={{
                                    backgroundColor: "white",
                                    borderColor: "white",
                                    width: "167px",
                                    fontSize: "16px",
                                    fontFamily: "BasicSans",
                                    height: "34px",
                                    color: "black",
                                    marginBottom: "40px",
                                    textAlign: "center"
                                }}
                                label="Create post"
                            >
                                Create post
                            </Button>
                        </NavLink>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            Home
                            <NavLink to="/posts"/>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>
                            Groups
                            <NavLink to="/groups"/>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined/>}>
                            My Posts
                            <NavLink to="/posts/my"/>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined/>}>
                            Friends
                            <NavLink to="/friends"/>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<DesktopOutlined/>}>
                            Message
                            <NavLink to="/message"/>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">

                    <Content style={{margin: '0 16px'}}>
                        <div>
                            {this.props.routes}

                        </div>


                    </Content>

                </Layout>
            </Layout>
        );
    }
}

export default SideBar