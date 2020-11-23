import React from "react";
import styled from "styled-components";
import { Input, Row, Col, Select, Button, Affix, message, Upload } from "antd";
import { Redirect } from "react-router-dom"
import axios from 'axios';
import store from '../../../store/Store';
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

class ProfileEdit extends React.Component {
  state = {
    tempUser: {
      userName:"",
      city:"",
      state:"",
      loginEmail:"",
      contactEmail:"",
      phone:"",
      aboutMe:"",
      avatarlink:"",
    },
    editing: true,
    file: null,
    userNameEmpty: true,
    contactEmailEmpty: true,
    loading: true,
    avatar: null,
    loadingAvatar: false,
    USstates: [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DC",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ],
  };
  constructor(props) {
    super(props)
    this.saveAll=this.saveAll.bind(this)
  }

  validateAvatar = (file) => {
    // Validate file type
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      message.error("Avatar image has to be in JPEG or PNG format");
      return false;
    }
    // Validate file size. If size is greater than 5MB then reject. Otherwise compress.
    if (file.size > 5 * 1024 * 1024) {
      message.error("Avatar image has to be smaller than 5MB");
      return false;
    }
    return true;
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      this.compressAvatar(event.target.result, callback);
    });
    reader.readAsDataURL(img);
  };

  compressAvatar(dataURL, callback) {
    let image = new Image();
    image.onload = () => {
      let canvas = document.createElement("canvas");
      const maxWidth = 150,
        maxHeight = 150;
      canvas.width = canvas.width > maxWidth ? maxWidth : canvas.width;
      canvas.height = canvas.height > maxHeight ? maxHeight : canvas.height;
      canvas
        .getContext("2d")
        .drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        function (blob) {
          callback(canvas.toDataURL("image/jpeg", 0.5), blob);
        },
        "image/jpeg",
        0.5
      );
    };
    image.src = dataURL;
  }
  

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loadingAvatar: true });
      return;
    }
    if (info.file.status === "done") {
      
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (link, avatar) =>
        axios.post('https://api.imgur.com/3/image', avatar, {
          headers: {
              'Authorization': 'Client-ID c9897a7d288d020'
          }
        }).then(res => {                                
            // console.log(res.data.data.link);
            this.setState(prevState => ({
              avatar,
              loadingAvatar: false,
              tempUser: {                   
                  ...prevState.tempUser,    
                  avatarlink:  res.data.data.link, 
              }
            }))
        }));
      ;
      
    }
  };
  componentDidMount() {
    const {email} = store.getState()
    axios.get("http://server.metaraw.world:3000/users/profile/get", {params: {email}})
    .then(res =>{
      if(res.data.statusCode === 200){
        this.setState({
          tempUser:res.data.profile
        },() =>{
          // console.log(this.state.tempUser)
        })
      }
    })
  }
    

  saveAll(){
    axios.post('http://server.metaraw.world:3000/users/profile/save', {
      ...this.state.tempUser})
    .then(res => {
      if (res.data.statusCode === 200) {
          console.log('profile has been saved')
          const action = {type: 'setUserName', data: {userName: this.state.tempUser.userName}}
          store.dispatch(action)
      }
      this.setState({
        editing: false,
      });

  })
  }
    
  render(){
      if (!this.state.editing) {
        return (
          <Redirect
            to={{
              pathname: "/profile",
            }}
          />
        );
      }
      const Option = Select.Option;
      const { TextArea } = Input;
      const handleStateChange = (USstate) => {
        this.setState(prevState => ({
          tempUser: {                   
              ...prevState.tempUser,    
              state: USstate,      
          }
        }))
      };
      return (
        <div>
        <Row>
        <SettingsTitle>
          Basic Information
        </SettingsTitle>
      </Row>
      <Row type="flex" justify="start" gutter={[24, 40]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={6}
          style={{ maxHeight: "90px" }}
        >
          <InputLabel>
            Username
            <ErrorLabel>{"\u00A0"}*</ErrorLabel>
            {/* {this.state.firstName.length > 20 ? (
              <ErrorLabel>*Too Long</ErrorLabel>
            ) : null} */}
          </InputLabel>

          <Input
            style={{ height: "80%" }}
            placeholder={this.state.tempUser.userName}
            value={this.state.tempUser.userName}
            onChange={(e) => {
              // change the value of the tempUser
              this.setState({
                firstNameEmpty: e.target.value === "",
              });
              this.setState(prevState => ({
                tempUser: {                   
                    ...prevState.tempUser,    
                    userName:  e.target.value,    
                }
              }))
            }}
          />
        </Col>
        
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={3}
          xl={3}
          style={{ maxHeight: "90px" }}
        >
          <InputLabel>Avatar</InputLabel>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={6}
          style={{ maxHeight: "90px", padding: "0px", marginTop:"25px" }}
        >
          <ImgCrop>
            <Upload
              style={{ width: "50px" }}
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76" 
              beforeUpload={this.validateAvatar}
              transformFile={this.compressAvatar}
              onChange={this.handleChange}
            >
              {this.state.loadingAvatar ? (
                <LoadingOutlined />
              ) : this.state.tempUser.avatarlink ? (
                <img
                  src={this.state.tempUser.avatarlink}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div className="ant-upload-text">Upload</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </Col>
      
      </Row>

      <Row type="flex" justify="start" gutter={[24, 40]}>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          style={{ maxHeight: "90px" }}
        >
          <InputLabel>City</InputLabel>
          <Input
            style={{ height: "80%" }}
            placeholder={this.state.tempUser.city}
            value={this.state.tempUser.city}
            onChange={(e) => {
              this.setState(prevState => ({
                tempUser: {                   
                    ...prevState.tempUser,    
                    city: e.target.value,
                }
              }))
            }}
          />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          style={{ maxHeight: "90px" }}
        >
          <InputLabel>State</InputLabel>
          <div>
            <Select
              style={{ width: "100%" }}
              size="large"
              defaultValue={this.stateDefault}
              onChange={handleStateChange}
            >
              {this.state.USstates.map((USstate) => {
                let i = 1;
                return (
                  <Option value={USstate} index={i++}>
                    {USstate}
                  </Option>
                );
              })}
            </Select>
          </div>
        </Col>
      </Row>

      <Row>
        <SettingsTitle>
          Contact
        </SettingsTitle>
      </Row>
      {/* first row */}
      <Row type="flex" justify="start" gutter={[24, 40]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ maxHeight: "90px" }}
        >
          <InputLabel>Login Email</InputLabel>
          <Input
            style={{ height: "80%" }}
            value={this.state.tempUser.loginEmail}
            disabled={true}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ maxHeight: "90px" }}
        >
          <InputLabel>
            Contact Email
          </InputLabel>
          <Input
            style={{ height: "80%" }}
            value={this.state.tempUser.contactEmail}
            onChange={(e) => {
              this.setState({
                contactEmailEmpty: e.target.value === "",
              });
              this.setState(prevState => ({
                tempUser: {                   
                    ...prevState.tempUser,    
                    contactEmail: e.target.value,
                    loginEmail:e.target.value,
                }
              }))
              
            }}
          />
        </Col>
      </Row>
      <Row type="flex" justify="start" gutter={[24, 40]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          style={{ maxHeight: "90px" }}
        >
          <InputLabel>
            Phone
          </InputLabel>

          <Input
            style={{ height: "80%" }}
            placeholder={this.state.tempUser.phoneNumber}
            value={this.state.tempUser.phoneNumber}
            onChange={(e) => {
              // change the value of the tempUser
              this.setState(prevState => ({
                tempUser: {                   
                    ...prevState.tempUser,    
                    phone: e.target.value,
                }
              }))
            }}
          />
        </Col>
      </Row>
      <Row>
          <SettingsTitle>
              About Me
          </SettingsTitle>
          <TextArea rows={4} 
           placeholder={this.state.tempUser.aboutMe}
           value={this.state.tempUser.aboutMe}
           onChange={(e) => {
            // change the value of the tempUser
            this.setState(prevState => ({
              tempUser: {                   
                  ...prevState.tempUser,    
                  aboutMe: e.target.value,
              }
            }))
          }}
          
          />
      </Row>
      <Row gutter={[24, 8]}>
          
          <Col
            span={6}
            style={{ maxHeight: "90px" }}
          >
            <Button
              type=""
              style={{
                height: "35px",
                marginTop:"25px",
                width: "100%",
                maxWidth: 140,
                backgroundColor: "#545770",
                color: "white",
              }}
              onClick={this.saveAll}
            >
              Save
            </Button>
          </Col>
        </Row>

     </div>)
  }
}
const SettingsTitle = styled.div`
  color: #545871;
  font-family: BasicSans;
  font-size: 20px;
  font-weight: Bold;
  margin-top: 30px;
  margin-bottom: 15px;
`;
const InputLabel = styled.div`
  font-family: BasicSans;
  font-size: 20px;
  color: #545870;
`;

const ErrorLabel = styled.div`
  height: 24px;
  font-family: BasicSans;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.6;
  letter-spacing: normal;
  text-align: left;
  color: #ff5c5c;
  display: inline-block;
  vertical-align: top;
`;

export default ProfileEdit;
