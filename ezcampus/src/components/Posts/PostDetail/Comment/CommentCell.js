import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './CommentCell.css'
import {Card} from 'react-bootstrap';
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import store from "../../../../store/Store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const transh = <FontAwesomeIcon icon={faTrashAlt}/>;
// styling sheet--do not modify
const title = {
    textAlign:"left",
    fontSize:"14px",
    height:"5px"
}

const styleText ={
    float:"left",
    fontSize:"15px",
}
const textbody = {
    borderTop: "1px black solid",
    padding: "10px",
    overflow:"scroll",
}

function CommentCell(props) {
    // console.log(props)
    // const date = new Date().toLocaleDateString();
    // const time = new Date().toLocaleTimeString();
    const {email,userName} = store.getState()
    return (
        <Card className={"Test-style-li"} >
            <Card.Header style={{padding:"10px,10px,0px,10px"}}>
                {/*<div style={{textAlign:"left"}}><Card.Img src={'#'}></Card.Img></div>*/}
                <Card.Title style={title}>
                    <div>
                        {/*<Link to={`/profile/${props.item.userName}`}>*/}
                        {/*    <div className='"CommentCell-name"'>*/}
                        {/*        {props.item.userName}*/}
                        {/*    </div>*/}
                        {/*</Link>*/}
                        <div  className={"CommentCell-name"}>{props.item.userName}</div>
                        <div style={{float:"right"}}>
                            {props.item.time} &nbsp;&nbsp;&nbsp;&nbsp; {props.item.date}
                            {props.item.email !=email? null : <i onClick={props.delete} style={{paddingLeft:"30px",float:"right",fontSize:"13px",color:"#016ba8"}}>{transh}</i>}
                        </div>
                    </div>
                </Card.Title>
            </Card.Header>
            <Card.Body style={textbody}>
                <Card.Text style={styleText}>{props.item.commentText}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CommentCell;