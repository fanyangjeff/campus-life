import React, { Component } from 'react'
import MyPostCell from './MyPostCell'
import { SwitcherOutlined } from '@ant-design/icons'
import './Post.css'
import store from '../../store/Store'
import axios from 'axios';

export default class MyPosts extends Component {
	state = {
		myPosts:[]
	}

    constructor(props) {
        super(props)
        this.history = props.history
		const { posts, email } = store.getState();
        this.unsubscribe = store.subscribe(() => {
            const myPosts = posts.filter(post => post.creatorEmail === email)
		    this.setState({myPosts})
        })
	}

    componentDidMount() {
        let interval = setInterval(() => {
            const {isLoading} = store.getState()
            if (!isLoading) {
                const {isLoggedIn} = store.getState()
                clearInterval(interval)
                if (!isLoggedIn) {
                    console.log('not logged in')
                    const action = {type: 'setShowPromptLogIn'}
                    store.dispatch(action)
                    this.history.push('/posts')
                }
            }
        }, 5)

        let postInterval = setInterval(() => {
            const {isLoading} = store.getState()
            if (!isLoading) {
                clearInterval(postInterval)
                const {posts, email} = store.getState()
                const myPosts = posts.filter(post => post.creatorEmail === email)
                this.setState({myPosts})
            }
        }, 5)

    }
    

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleDelete = postId => {
        axios.delete("http://server.metaraw.world:3000/posts/delete_a_post", 
        {params: {postId}})
        .then(res => {
            if(res.data.statusCode === 200){
                const action = {
                    type: 'deletePost', 
                    data: {targetPostId: postId}
                }
                store.dispatch(action)
                const myPosts = this.state.myPosts.filter(post => post.postId !== postId);
                this.setState({myPosts})
            }
        })
    }

    switcherOutlinedHeader = () => {
        return (
            <div style={{marginLeft: '35px', marginTop: '20px'}}>
                <SwitcherOutlined style={{
                    fontSize:40,
                    float: "left"}}/>
                <div className='posts-homeOutLined'>
                    Post History
                </div>
                {/* <div style={{float: 'right', marginRight: '50px'}}>
                        <Button variant='secondary' onClick={this.handleShowAll}>Show All</Button>
                </div> */}
            </div>
        )
    }

    createPostList = () => {
        return (
            <div className='posts-container'>
            {
            this.state.myPosts.map(
                post => (
                <MyPostCell 
                    data={post}
                    key={post.postId}
                    history={this.props.history}
                    onDelete={this.handleDelete}
                />
                ))
                }
            </div>
        )
    }

    render() {
        return (
            <div>
				<div className='post-history-header'>
					{this.switcherOutlinedHeader()}
				</div>
				<div className='post-page-body-containe'>
					{this.createPostList()}
				</div>
            </div>
        )
    }
}
