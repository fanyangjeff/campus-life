import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './CommentCell.css'
import {Card} from 'react-bootstrap';

// styling sheet--do not modify
const title = {
    // border: "1px red solid",
    textAlign:"left",
    fontSize:"14px",
    height:"5px"
}

const styleText ={
    // border: "1px red solid",
    float:"left",
    fontSize:"12px",
}
const textbody = {
    // border: "1px red solid",
    padding: "10px",
    overflow:"scroll",
}

function CommentCell(props) {
    // console.log(props)
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    return (
        <Card style={{width:"100%",height:"150px",marginBottom:"5px"}}>
            <Card.Header style={{padding:"10px"}}>
                {/*<div style={{textAlign:"left"}}><Card.Img src={'#'}></Card.Img></div>*/}
                <Card.Title style={title}>
                    <div>
                        {/*onClick={()=>{props.history.push( `/posts/${this.id}`)}}*/}
                        <div className={"CommentCell-name"}>{props.item.name}</div>
                        <p style={{float:"right"}}>{time} &nbsp;&nbsp;&nbsp;&nbsp; {date}</p>
                    </div>
                </Card.Title>
            </Card.Header>
            <Card.Body style={textbody}>
                <Card.Text style={styleText}>{props.item.comment}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CommentCell;