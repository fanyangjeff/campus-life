import React, {Component} from 'react';
import './Comment.css'
import axios from 'axios'
import store from "../../../../store/Store";
import CommentCell from "./CommentCell";
import Notifications from "react-notify-toast";
import {Card} from "react-bootstrap";
import {notify} from "react-notify-toast/bin/notify";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            commentText: '',
            postId: this.props.history.location.pathname.slice(7),
        }
        this.handlerTextChange = this.handlerTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        // axions read a data of comments
        // responds set state

        let interval = setInterval(() => {
            const {isLoading} = store.getState()
            if (!isLoading) {
                clearInterval(interval)
                axios.get('http://server.metaraw.world:3000/posts/fetchTheCommentList', {
                    params: {
                        postId: this.state.postId
                    }
                })
                    .then(res => {
                        if (res.data.statusCode === 200) {
                            console.log(res.data)
                            this.setState({
                                commentList: res.data.commentList,
                            })
                        }
                    })
            }
        }, 5)
    
    }



    // Get the comment text
    handlerTextChange = (event) => {
        this.setState({
            commentText: event.target.value
        })
    }

    /*
    *Todo: Submit the comment text
    **/
    handleSubmit = (event) => {
        event.preventDefault()
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const {email, userName} = store.getState()
        const {postId, commentText} = this.state
        if (commentText !== '') {
            axios.post('https://server.metaraw.world/posts/updateTheCommentList', {
                'postId': postId,
                'email': email,
                'commentText': commentText,
                'date': date,
                'time': time,
            })
                .then(res => {
                    if (res.data.statusCode === 200) {
                        notify.show('Add your comment Successfully')
                        this.setState({
                            commentText:'',
                        }, ()=>{
                            this.componentDidMount()
                        })
                    }
                })
                .catch(err => {
                    if (!err.response) return
                    const errRes = err.response
                    if (errRes.status === 404) {
                        console.log(errRes.data)
                        alert(errRes.data.message)
                    }
                })
        }
    }
    handlerDeleteComment = (event) => {
        const {email, userName} = store.getState()
        axios.delete('https://server.metaraw.world/posts/deleteTheComment', {
            // "postId": this.state.postId,
            // "commentId": event,
            params: {
                "postId": this.state.postId,
                "commentId": event,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    notify.show('Delete Successfully')
                    this.setState({
                        commentList: this.state.commentList.filter(el => el.commentId !== event)
                    }, () => {
                        //for TESTING
                        // console.log(this.state.commentList)
                    })
                }

            })
            .catch(err => {
                if (!err.response) return
                const errRes = err.response
                if (errRes.status === 404) {
                    // console.log(errRes.data)
                    alert(errRes.data.message)
                }
            })
    }
    handlerUpdateComment = (commentText,commentId) =>{
        console.log("what",commentText,commentId)
        notify.show('Edit Successfully')
        // http://server.metaraw.world:3000/posts/updateTheComment
        axios.post('https://server.metaraw.world/posts/updateTheComment',{
            'postId':this.state.postId,
            'commentId':commentId,
            'commentText':commentText,
        })
            .then(res=>{
                if(res.status === 200){
                    this.componentDidMount()
                    notify.show("Update successful")
                }
            })
    }

    render() {
        return (
            <form className="comment-li" onSubmit={this.handleSubmit}>
                <Notifications/>
                <textarea type={"text"} value={this.state.commentText} className={"box-li"} placeholder={"Write a comment"}
                          onChange={this.handlerTextChange}></textarea>
                <button
                    className={"primaryContained-li"}
                    type="submit"
                >
                    Add Comment
                </button>

                <br/>
                <br/>
                <br/>
                {this.state.commentList == null ? null : this.state.commentList.map((item) => (
                    <CommentCell key={item.commentId} delete={this.handlerDeleteComment.bind(this, item.commentId)}
                                 updateComment={this.handlerUpdateComment.bind(this)}
                                 history={this.props.history} item={item}/>
                )).reverse()}
            </form>
        );
    }
}

export default Comment;