import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './CommentCell.css'
import {Card, FormControl, InputGroup, Button, Form} from 'react-bootstrap';
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import store from "../../../../store/Store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const transh = <FontAwesomeIcon icon={faTrashAlt}/>;
const Edit = <FontAwesomeIcon icon={faEdit}/>
// styling sheet--do not modify
const title = {
    textAlign: "left",
    fontSize: "14px",
    height: "5px"
}

const styleText = {
    float: "left",
    fontSize: "15px",
}
const textbody = {
    borderTop: "1px black solid",
    padding: "10px",
    overflow: "scroll",
}

class CommentCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditComment: false,
            editText: '',
        }
        this.handlerEditComment = this.handlerEditComment.bind(this)
        this.handlerEditText = this.handlerEditText.bind(this)
        this.handlerUpdateComment = this.handlerUpdateComment.bind(this)
        this.handlerUpdateCommentCancel = this.handlerUpdateCommentCancel.bind(this)
    }

    handlerEditComment = () => {
        this.setState({
            isEditComment: true,
        })
    }
    handlerEditText = (event) => {
        this.setState({
            editText: event.target.value,
        })
    }
    handlerUpdateComment = () => {
        if(this.state.editText == ''){
            alert("The comment can not be Empty")
        }else {
            this.setState({
                isEditComment: false,
            }, () => {
                this.props.updateComment(this.state.editText, this.props.item.commentId)
            })
        }
    }
    handlerUpdateCommentCancel = () => {
        this.setState({
            isEditComment: false,
        })
    }

    render() {
        const {email, userName} = store.getState()
        return (
            <Card className={"Test-style-li"}>
                <Card.Header style={{padding: "10px,10px,0px,10px"}}>
                    {/*<div style={{textAlign:"left"}}><Card.Img src={'#'}></Card.Img></div>*/}
                    <Card.Title style={title}>
                        <div>
                            <div className={"CommentCell-name"}>
                                <Link to={`/profile/${this.props.item.email}`}>
                                    {this.props.item.userName}
                                </Link>
                            </div>

                            <div style={{float: "right"}}>
                                {this.props.item.time} &nbsp;&nbsp;&nbsp;&nbsp; {this.props.item.date}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                {this.props.item.email != email ? null:<i style={{cursor: "pointer", color: "#016ba8"}}
                                   onClick={this.handlerEditComment}>{Edit}</i>}
                                &nbsp;&nbsp;
                                {this.props.item.email != email ? null : <i onClick={this.props.delete} style={{
                                    float: "right",
                                    fontSize: "13px",
                                    color: "#016ba8",
                                    cursor: "pointer"
                                }}>{transh}</i>}
                            </div>
                        </div>
                    </Card.Title>
                </Card.Header>
                {this.state.isEditComment ?
                    <Form>
                        <InputGroup>
                            <FormControl onChange={this.handlerEditText}
                                         style={{resize: "none", height: "65px", borderRadius: "0px"}} as="textarea"
                                         aria-label="With textarea">{this.props.item.commentText}</FormControl>
                        </InputGroup>
                        <Button onClick={this.handlerUpdateCommentCancel} style={{
                            float: "right",
                            margin: "1px 1px 1px 0px",
                            background: "#016BA8"
                        }}>Cancel</Button>
                        <Button onClick={this.handlerUpdateComment} style={{
                            float: "right",
                            margin: "1px 1px 1px 0px",
                            background: "#016BA8"
                        }}>Submit</Button>
                    </Form> :
                    <Card.Body style={textbody}>
                        <Card.Text style={styleText}>{this.props.item.commentText}</Card.Text>
                    </Card.Body>
                }
            </Card>
        );
    }
}

export default CommentCell;