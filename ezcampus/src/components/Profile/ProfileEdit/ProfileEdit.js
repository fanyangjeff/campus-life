import React from "react";
import styled from "styled-components";
import { Input, Row, Col, Select, Button, Affix, message, Upload } from "antd"
class ProfileEdit extends React.Component {
    
    state = {
        tempUser: {},
        editing: true,
        file: null,
        firstNameEmpty: true,
        lastNameEmpty: true,
        titleEmpty: true,
        contactEmailEmpty: true,
        loading: true,
        avatarLink: "",
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
    
  render(){
      const Option = Select.Option;
      const { TextArea } = Input;
      const handleStateChange = (USstate) => {
        this.setState({
          tempUser: {
            ...this.state.tempUser,
            stateName: USstate,
          },
        });
      };
      return (
        <div>
        <Row>
        <SettingsTitle>
          {/* <img
            src={lineIcon}
            style={{
              width: "5px",
              height: "30px",
            }}
          /> */}
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
            First name
            <ErrorLabel>{"\u00A0"}*</ErrorLabel>
            {/* {this.state.firstName.length > 20 ? (
              <ErrorLabel>*Too Long</ErrorLabel>
            ) : null} */}
          </InputLabel>

          <Input
            style={{ height: "80%" }}
            placeholder={this.state.firstName}
            value={this.state.firstName}
            onChange={(e) => {
              // change the value of the tempUser
              this.setState({
                tempUser: {
                  ...this.state.tempUser,
                  firstName: e.target.value,
                },
                firstNameEmpty: e.target.value === "",
              });
            }}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={6}
          style={{ maxHeight: "90px" }}
        >
          <InputLabel>
            Last name
            {/* <ErrorLabel>{"\u00A0"}*</ErrorLabel>
            {this.state.lastName.length > 20 ? (
              <ErrorLabel>*Too Long</ErrorLabel>
            ) : null} */}
          </InputLabel>

          <Input
            style={{ height: "80%" }}
            placeholder={this.state.lastName}
            value={this.state.lastName}
            onChange={(e) => {
              this.setState({
                tempUser: {
                  ...this.state.tempUser,
                  lastName: e.target.value,
                },
                lastNameEmpty: e.target.value === "",
              });
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
          style={{ maxHeight: "90px", padding: "0px" }}
        >
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
                          placeholder={this.state.city}
                          value={this.state.city}
                          onChange={(e) => {
                            this.setState({
                              tempUser: {
                                ...this.state.tempUser,
                                city: e.target.value,
                              },
                            });
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
                        {/* <img
                          src={lineIcon}
                          alt="triangle with all three sides equal"
                          style={{
                            width: "5px",
                            height: "30px",
                          }}
                        /> */}
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
                          value={this.state.tempUser.email}
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
                          {/* <ErrorLabel>{"\u00A0"}*</ErrorLabel>
                          {this.state.tempUser.contactEmail &&
                          !validator.isEmail(
                            this.state.tempUser.contactEmail
                          ) ? (
                            <ErrorLabel>*not valid</ErrorLabel>
                          ) : null} */}
                        </InputLabel>
                        <Input
                          style={{ height: "80%" }}
                          value={this.state.contactEmail}
                          onChange={(e) => {
                            this.setState({
                              tempUser: {
                                ...this.state.tempUser,
                                contactEmail: e.target.value,
                              },
                              contactEmailEmpty: e.target.value === "",
                            });
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
                          {/* {this.state.tempUser.phoneNumber &&
                          !validator.isMobilePhone(
                            this.state.tempUser.phoneNumber
                          ) ? (
                            <ErrorLabel>*not valid</ErrorLabel>
                          ) : null} */}
                        </InputLabel>

                        <Input
                          style={{ height: "80%" }}
                          placeholder="Your phone number goes here"
                          value={this.state.tempUser.phoneNumber}
                          onChange={(e) => {
                            // change the value of the tempUser
                            this.setState({
                              tempUser: {
                                ...this.state.tempUser,
                                phoneNumber: e.target.value,
                              },
                            });
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                        <SettingsTitle>
                            {/* <img
                            src={lineIcon}
                            alt="triangle with all three sides equal"
                            style={{
                                width: "5px",
                                height: "30px",
                            }}
                            /> */}
                            About Me
                        </SettingsTitle>
                        <TextArea rows={4} />


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
                              // set the button to be the full width of the Col,
                              // but cannot be too big.
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
