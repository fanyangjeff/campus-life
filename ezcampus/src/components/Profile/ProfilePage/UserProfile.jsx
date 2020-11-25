import React from "react";
import styled from "styled-components";
import BigProfile from "../icons/BigProfile.png";
import axios from 'axios';
import { Button, Card } from "antd";
import contactIcon from "../icons/group.png";
import { EditOutlined} from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import store from '../../../store/Store';


class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.history = props.history
  }
  state={
    redirect: false,
    profile:{}
  }

  componentDidMount() {
    
    let interval = setInterval(() => {
        const {isLoading} = store.getState()
        if (!isLoading) {
          clearInterval(interval)
          const {isLoggedIn} = store.getState()
          if (!isLoggedIn) {
            const action = {type: 'setShowPromptLogIn'}
            store.dispatch(action)
            this.history.push('/posts')
          }
        }
    }, 5)

    store.subscribe(() => {
        let interval = setInterval(() => {
          const {isLoading} = store.getState()
          if (!isLoading) {
            clearInterval(interval)
            const {isLoggedIn} = store.getState()
            if (!isLoggedIn) {
              this.history.push('/posts')
          }
          }

        }, 5)
    })

    let loadUserInterval = setInterval(() => {
          const {isLoading} = store.getState()
          if (!isLoading) {
            clearInterval(loadUserInterval)
            const {email} = store.getState()
            axios.get("http://server.metaraw.world:3000/users/profile/get", {params: {email}})
            .then(res =>{
              if(res.data.statusCode === 200){
                this.setState({
                  profile:res.data.profile
                },() =>{
                  // console.log(this.state.profile.avatarlink)
                })
              }
            })
            
          }
    }, 5)
    
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
        {!this.state.profile.avatarlink ?
            <AvatarImage
              src={BigProfile}
            >
            </AvatarImage>  :
            <AvatarImage
            src={this.state.profile.avatarlink}
            ></AvatarImage>
        }
        </div>
        <div style={styles.nameText}>
          <Name>{this.state.profile.userName}</Name>
        </div>
        {this.state.profile.city || this.state.profile.state?
           <div style={styles.positionText}>
            <Name>{this.state.profile.city}</Name>
            <Name>{this.state.profile.state}</Name>
          </div> : null
        }
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
              {this.state.profile.aboutMe}
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
            Contact Email:
            <div style={styles.text}>
              {this.state.profile.contactEmail}
            </div>
          </div>
          <div style={styles.fieldText}>
            Phone:
            <div style={styles.text}>
               {this.state.profile.phone}
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
  },
  positionText: {
    fontFamily: "Ubuntu",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#545871",
    width: "100%",
    paddingTop: "5px"
  }
}


export default UserProfile;