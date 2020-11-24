import React, {Component} from 'react';
import './Comment.css'
import axios from 'axios'
import store from "../../../../store/Store";
import CommentCell from "./CommentCell";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList:[],
            commentText: '',
            postId: this.props.history.location.pathname.slice(7),
        }
        this.handlerTextChange = this.handlerTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        // axions read a data of comments
        // responds set state
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
        const {email,userName} = store.getState()
        const {postId, commentText} = this.state
        if(commentText !== '') {
            axios.post('http://server.metaraw.world:3000/posts/updateTheCommentList', {
                'postId': postId,
                'email': email,
                'commentText': commentText,
                'date': date,
                'time': time,
            })
                .then(res => {
                    if (res.data.statusCode === 200) {
                        // check for best way to write it.
                        {this.componentDidMount()}
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
        console.log("I am here--------",event)
        const {email,userName} = store.getState()
        axios.delete('http://server.metaraw.world:3000/posts/deleteTheComment',{
            // "postId": this.state.postId,
            // "commentId": event,
            params: {
                "postId": this.state.postId,
                "commentId": event,
            }
        })
            .then(res=>{
                if(res.status === 200){
                    this.setState({
                        commentList:this.state.commentList.filter(el => el.commentId !== event )
                    },() => {
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
    render() {
        return (
            <form className="comment-li" onSubmit={this.handleSubmit}>
                <textarea type={"text"} className={"box-li"} placeholder={"Write a comment"} onChange={this.handlerTextChange}></textarea>
                <button
                    className={"primaryContained-li"}
                    type="submit"
                >
                    Add Comment
                </button>

                <br/>
                <br/>
                <br/>
                {/*onClick={() => {this.handleClick('Others')}*/}
                {this.state.commentList == null? null :this.state.commentList.map((item) => (
                    <CommentCell key={item.commentId} delete={this.handlerDeleteComment.bind(this,item.commentId)} history={this.props.history} item={item}/>
                )).reverse()}
            </form>
        );
    }
}

export default Comment;