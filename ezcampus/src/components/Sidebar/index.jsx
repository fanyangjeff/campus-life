import React from "react";
import { Layout, Menu, Button } from 'antd';
import { NavLink } from "react-router-dom";
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
import store from '../../store/Store'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SideBar extends React.Component {
  state = {
    collapsed: false,
    showPopUPLogin:false,
    userName: 'Guest'
  };

  componentDidMount() {
    store.subscribe(() => {
      const {userName} = store.getState()
      this.updateUserName(userName)
    })
  }

  updateUserName = (userName) => {
    this.setState({
      userName
    })
  }

  onTogglePopup= () => {
    this.setState((prevState) => {
      return {showPopUPLogin: !prevState.showPopUPLogin}
    })
  }


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
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
                    src={BigProfile? BigProfile: null}
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
                Log In / Sign Up
              </Button>
              {this.state.showPopUPLogin? <Login closePopup={this.onTogglePopup} /> : null}
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
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Home
              <NavLink to="/posts" />
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Groups
              <NavLink to="/groups" />
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              My Posts
              <NavLink to="/posts/my" />
            </Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}>
              Friends
              <NavLink to="/friends" />
            </Menu.Item>
            <Menu.Item key="5" icon={<DesktopOutlined />}>
              Message
              <NavLink to="/message" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
         
          <Content style={{ margin: '0 16px' }}>
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