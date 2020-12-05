import React, {Component} from 'react';
import './Comment.css'
import axios from 'axios'
import store from "../../../../store/Store";
import CommentCell from "./CommentCell";
import Notifications from "react-notify-toast";
import {notify} from "react-notify-toast/bin/notify";
import API_PREFIX from '../../../../API_PREFIX'
import {Modal} from "antd";
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [],
            commentText: '',
            postId: this.props.history.location.pathname.slice(7),
            isDeleteConfirmation:false,
            deleteId:' '
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
                axios.get(`${API_PREFIX}/posts/fetchTheCommentList`, {
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

    handlerDeleteComfirmation =(event)=>{
        console.log(event)
        this.setState({
            isDeleteConfirmation:true,
            deleteId:event,
        },()=>{
            console.log(this.state.isDeleteConfirmation)
        })
    }

    /*
    *Todo: Submit the comment text
    **/
    handleSubmit = (event) => {
        event.preventDefault()
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        const {email} = store.getState()
        const {postId, commentText} = this.state
        if(commentText === ''){
            notify.show('Please enter a valid comment')
        } else {
            axios.post(`${API_PREFIX}/posts/updateTheCommentList`, {
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
        // console.log("I am here--------",event)
        // const {email,userName} = store.getState()
        axios.delete(`${API_PREFIX}/posts/deleteTheComment`,{
            params: {
                "postId": this.state.postId,
                "commentId": event,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    notify.show('Delete Successfully')
                    this.setState({
                        commentList: this.state.commentList.filter(el => el.commentId !== event),
                        isDeleteConfirmation:false,
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
                    this.setState({
                        isDeleteConfirmation:false,
                    })
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
                    <CommentCell key={item.commentId} delete={this.handlerDeleteComfirmation.bind(this,item.commentId)}
                                 updateComment={this.handlerUpdateComment.bind(this)}
                                 history={this.props.history} item={item}/>
                )).reverse()}
                <Modal
                    visible={this.state.isDeleteConfirmation}
                    onOk={this.handlerDeleteComment.bind(this,this.state.deleteId)}
                    onCancel={()=>{this.setState({isDeleteConfirmation:false,})}}
                >
                    <p>Confirm to remove <span style={{fontWeight:"bold"}}>your comment</span> from comment board?</p>
                </Modal>
            </form>
        );
    }
}

export default Comment;