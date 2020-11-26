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
import {withRouter } from 'react-router-dom';
import EmailVerification from "../Login/EmailVerification/EmailVerification";
import PromptLogIn from "../Login/PromptLogIn";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class SideBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            collapsed: false,
            showPopUPLogin: false,
            showPromptLogIn: false,
            isEmailVerification: false,
            userName: 'Guest',
            avatarlink:'',
            isLoggedIn: false,
            currentSelectedMenuItem: '1'
        }

        this.unsubscribe = store.subscribe(() => {
            const {userName, isLoggedIn, showPromptLogIn, avatarlink} = store.getState()
            this.setState({userName, isLoggedIn, showPromptLogIn, avatarlink}, () => {
                if (!this.state.isLoggedIn) {
                    this.setState({currentSelectedMenuItem: '1'})
                }
            })
        })
    }
   

    scomponentWillUnmount() {
        this.unsubscribe()
    }

    onTogglePopup = () => {
        console.log('TOGGLE POPUP!!!!!')
        this.setState((prevState) => {
            return {
                showPopUPLogin: !prevState.showPopUPLogin,
            }
        })
    }

    onTogglePromptPopup = () => {
        this.setState((prevState) => {
            return {
                showPromptLogIn: !prevState.showPromptLogIn
            }
        })
        const action = {type: 'unsetShowPromptLogIn'}
        store.dispatch(action)
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

    onSelectMenuItem = ({key}) => {
        //if the user hasn't logged in, but trying to select items other than Home and Sections,
        //then we let the tab stay at the homepage 
        if (!this.state.isLoggedIn && key != '1'&& key != '2') {
            this.setState({currentSelectedMenuItem: '1'})
            return
        }
        this.setState({currentSelectedMenuItem: key})
    }

    render() {

        const { location } = this.props;
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
                                src={this.state.avatarlink ? this.state.avatarlink : BigProfile}
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
                            {this.state.isLoggedIn ? 'Log out' : 'Log in / Sign up'}
                        </Button>
                        {
                            this.state.showPopUPLogin && !this.state.isLoggedIn?
                            <Login closePopup={this.onTogglePopup} onToggleEmailVerification={this.onToggleEmailVerification}
                            /> : null}
                        
                        {
                            this.state.showPopUPLogin && this.state.isLoggedIn?
                            <Logout closePopup={this.onTogglePopup}/>:null
                        }
                        
                        {
                            this.state.showPromptLogIn? <PromptLogIn openLogin={this.onTogglePopup} closePrompt={this.onTogglePromptPopup}/>:null    
                        }

                        {this.state.isEmailVerification ?
                            <EmailVerification closePopup={this.onToggleEmailVerification}
                            /> : null}
                    </div>
                    <div>
                        <NavLink to={"/posts/create"}>
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
                    <Menu theme="dark"  selectedKeys={[location.pathname]}  defaultSelectedKeys={['/posts']} >
                        <Menu.Item key="/posts" icon={<PieChartOutlined/>}>
                            Home
                            <NavLink to="/posts"/>
                        </Menu.Item>
                        <Menu.Item key="/groups" icon={<DesktopOutlined/>} >
                            Sections
                            <NavLink to="/groups"/>
                        </Menu.Item>

                        <Menu.Item key="/posts/my" icon={<UserOutlined/>}>
                            My Posts
                            <NavLink to="/posts/my"/>
                        </Menu.Item>

                        <Menu.Item key="/contacts" icon={<UserOutlined/>}>
                            Contacts
                            <NavLink to={{pathname: '/contacts', state: {from:this.props.location.pathname}}}/>
                        </Menu.Item>
                            
                        <Menu.Item key="/message" icon={<DesktopOutlined/>}>
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

export default  withRouter(SideBar);