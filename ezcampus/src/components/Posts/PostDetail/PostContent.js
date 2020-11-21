import { Avatar, Col, Row,  Card } from "antd";
import React from "react";
import BigProfile from "../icons/BigProfile.png"
import styled from "styled-components";

class PostContent extends React.Component {
    state = {
      userId: "",
      loading: true,
      firstName: "",
      lastName: "",
      title: "",
      avatar: "",
      timestamp: "",
    };

  
    render() {
      return (
        <div>
          <Card style={{width:"80%"}}>
              <Row align="middle">
                <Col flex="0 1" style={{ margin: "5px" }}>
                  <Avatar size={50} src={BigProfile} alt="" />
                </Col>
                <Col flex="2 1" style={{ margin: "5px" }}>
                  <span style={styles.nameText}>
                    Yingjia Gu
                  </span>
                </Col>
                <Col flex="1 1" style={{ textAlign: "right", margin: "5px" }}>
                  <span style={styles.timeText}>11/05/2020</span>
                </Col>
              </Row>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                <div class="postText">
                  <PostText> "about": "Located on the eastern end of campus between Eleanor Roosevelt College and Warren College, the Canyonview Aquatic Center features two outdoor, Olympic-sized pools, each of which can be divided into eight lanes of 50 meters in length, or 19 lanes of 25 yards in length. The aquatic center also features a state-of-the-art weight room. Canyonview is home to the UCSD men's and women's water polo teams, as well as the men's and women's swimming and diving programs.",</PostText>
                </div>
                <style type="text/css"></style>
              </div>
          </Card>
         
        </div>
      );
    }
  }
  
  const styles = {
    nameText: {
      fontFamily: "BasicSans",
      fontWeight: "bold",
      fontSize: 20,
      color: "#545871",
      verticalAlign: "middle",
      textAlign: "center",
      display: "inline-block",
    },
    timeText: {
      fontFamily: "BasicSans",
      fontWeight: "300",
      fontSize: "12",
      color: "#808295",
    },
  };

  const PostText = styled.div`
  font-family: BasicSans;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  color: #545871;
  display: inline-block;
  margin-top: 20px;
  word-break: break-word;
`;
  
  export default PostContent;
  