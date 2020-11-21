import React from "react";
import styled from "styled-components";
import BigProfile from "../icons/BigProfile.png";

import { Button, Card } from "antd";
import contactIcon from "../icons/group.png";
import { EditOutlined} from "@ant-design/icons";
import { Redirect } from "react-router-dom";


class UserProfile extends React.Component {
  state={
    redirect: false,
  }
  
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/profile/settings" />;
    }
  };
  render() {
    return (
    <div>
      {this.renderRedirect()}
      <Card
       style ={{width:"60%"}}
        headStyle={{ background: "#DEE0EB" }}
        extra={
          <Button
            style={styles.editButton}
            onClick={
             
              (this.setRedirect = () => {
                this.setState({
                  redirect: true
                });
              })
            }
          >
            <EditOutlined />
          </Button>
        }
      >
        <div style={styles.avatar}>
          <AvatarImage
            src={BigProfile}
          ></AvatarImage>
        </div>
        <div style={styles.nameText}>
          <Name>Yingjia</Name>
          <Name>Gu</Name>
        </div>
      <div>
          <TitleField>
            <img
              src={contactIcon}
              alt="contact"
              style={{ width: 23, height: 23, marginRight: 10 }}
            ></img>
            About Me
          </TitleField>
          <div style={styles.fieldText}>
            Welcome to my profile page!
          </div>
      </div>
      <div>
          <TitleField>
            <img
              src={contactIcon}
              alt="contact"
              style={{ width: 23, height: 23, marginRight: 10 }}
            ></img>
            Contact Info
          </TitleField>
          <div style={styles.fieldText}>
            Email:
            <div style={styles.text}>
              y1gu@ucsd.edu
            </div>
          </div>
          <div style={styles.fieldText}>
            Phone:
            <div style={styles.text}>
              8585317958
            </div>
          </div>
        </div>
      
      </Card>
     
        
    </div>
    )
  }
}


const Name = styled.div`
  display: inline-block;
  margin: 0 5px 0 5px;
  font-family: BasicSans;
`;

const AvatarImage = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 39px;
`;

const TitleField = styled.div`
  font-size: 25px;
  display: flex;
  align-items: center;
  line-height: 24px;
  font: BasicSans;
  letter-spacing: 0;
  margin-top: 15px;
  color: #545871;
  opacity: 1;
  word-break: break-word;
`;

const styles = {
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  text:{
    display: "inline-block",
    fontSize:"20px",
    marginLeft: "30px",
    color: "#666774", 
  },
  fieldText:{
    color: "#666774", 
    marginTop: "5px", 
    fontSize:"20px"
  },
  nameText: {
    fontFamily: "Ubuntu",
    fontSize: "35px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#545871",
    width: "100%",
    paddingTop: "5px"
  }
}


export default UserProfile;