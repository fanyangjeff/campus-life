import React, {Component} from 'react';
import './Comment.css'
import axios from 'axios'
import store from "../../../../store/Store";
import CommentCell from "./CommentCell";

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentList: [{id: 1, name: "Jone Doe", comment: 'I am interesting in it. My phone number: 408-xxx-xxxx '},
                {
                    id: 2,
                    name: "Jeffrey li",
                    comment: 'Can you lower down your price,I can pick up by myself. sending me a message. if you can do that for me. My phone number is: 408-xxx-xxxx'
                },
                {id: 3, name: "Liyuan lin", comment: ''},
                {id: 4, name: "jeff", comment: ''},
                {id: 5, name: "manxin zhang", comment: ''},],
            commentText: '',
            postId: this.props.history.location.pathname.slice(7),
        }
        this.handlerTextChange = this.handlerTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        // axions read a data of comments
        // responds set state
        axios.get('#', {
            params: {
                postId: this.state.postId
            }
        })
            .then(res => {
                if (res.data.statusCode === 200) {
                    console.log(res.data)
                    alert("success")
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
        const {email} = store.getState()
        const {postId, commentText} = this.state
        console.log(postId, email, commentText, date, time)
        axios.post('#', {
            'postId': postId,
            'email': email,
            'commentText': commentText,
            'date': date,
            'time': date,
        })
            .then(res => {
                if (res.data.statusCode === 200) {
                    console.log('comment has been saved')
                }
            })
            .catch(err=>{
                if (!err.response) return
                const errRes = err.response
                if (errRes.status === 404) {
                    console.log(errRes.data)
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
                {this.state.commentList.map((item) => (
                    <CommentCell history={this.props.history} key={item.id} item={item}/>
                ))}
            </form>
        );
    }
}

export default Comment;