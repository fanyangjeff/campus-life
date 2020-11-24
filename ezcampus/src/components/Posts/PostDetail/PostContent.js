import { Avatar, Col, Row,  Card } from "antd";
import React from "react";
import BigProfile from "../icons/BigProfile.png"
import styled from "styled-components";
import store from '../../../store/Store'
import Comment from "./Comment/Comment";
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios'
class PostContent extends React.Component {

    constructor(props) {
      super(props)
      this.postId = props.history.location.pathname.slice(7)
      this.state = {
        data: {
          creatorName: '', 
          creatorEmail: '', 
          title: '', 
          description: '', 
          views: 0, 
          likes: 0, 
          date: '', 
          postId: '', 
          postType: ''
        }
      }
    }

    componentDidMount() {
          console.log(this.props.history)
          console.log(this.props.history.location)
          axios.get('http://server.metaraw.world:3000/posts/get_a_post_detail', {params: {postId:this.postId}})
          .then(res => {
              const post = res.data.data
              //console.log(post)
              this.setState({data: post})
          })
          .catch(err => {
            console.log(err)
          })
    }


    render() {
      return (
        <div>
          <Card style={{width:"100%"}}>
              <Row align="middle">
                <Col flex="0 1" style={{ margin: "5px" }}>
                  <Avatar size={50} src={BigProfile} alt="" />
                </Col>
                <Col flex="2 1" style={{ margin: "5px" }}>
                  <span style={styles.nameText}>
                    {this.state.data.creatorName}
                  </span>
                </Col>
                <Col flex="1 1" style={{ textAlign: "right", margin: "5px" }}>
                  <span style={styles.timeText}>{this.state.data.date}</span>
                </Col>
              </Row>
              <Col span={24}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  fontFamily: "BasicSans",
                  paddingTop: "25px",
                }}
              >
                <div style={styles.postTitle}> {this.state.data.title} </div>

                <style type="text/css"></style>
              </div>
            </Col>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                <div class="postText">
                  <PostText>{ReactHtmlParser(this.state.data.description)}</PostText>
                </div>
                <style type="text/css"></style>
              </div>
          </Card>
            <Comment history={this.props.history}/>
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
    postTitle: {
      fontFamily: "BasicSans",
      fontSize: 26,
      fontWeight: "bold",
      textAlign: "left",
      color: "#545871",
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
  