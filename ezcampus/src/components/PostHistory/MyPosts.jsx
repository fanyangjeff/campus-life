import React, { Component } from 'react'
import PostCell from './PostCell'
import { SwitcherOutlined } from '@ant-design/icons'
import {Button} from 'react-bootstrap'
import './Post.css'
import store from '../../store/Store'


export default class MyPosts extends Component {
	state = {
		myPosts:[]
	}

    constructor(props) {
        super(props)
        this.history = props.history
		const { posts, email } = store.getState();
		const myPosts = posts.filter(post => post.creatorEmail === email)
		this.setState({myPosts})
        this.unsubscribe = store.subscribe(() => {
            const {currentSelectedPostType} = store.getState()
            if (currentSelectedPostType) {
                const customizedPosts = posts.filter(post => post.postType == currentSelectedPostType)
                //console.log(customizedPosts)
                this.setState({myPosts: customizedPosts})
            }
        })
	}

    componentDidMount() {

        setTimeout(() => {
            const {isLoggedIn} = store.getState()
            if (!isLoggedIn) {
                console.log('not logged in')
                const action = {type: 'setShowPromptLogIn'}
                store.dispatch(action)
                this.history.push('/posts')
            }
        }, 300)

        store.subscribe(() => {
            setTimeout(() => {
                const {isLoggedIn} = store.getState()
                if (!isLoggedIn) {
                    this.history.push('/posts')
                }
            }, 300)
        })

        setTimeout(() => {
            const {posts, email, currentSelectedPostType} = store.getState()
            const myPosts = posts.filter(post => post.creatorEmail === email)
            this.setState({myPosts})
            if (currentSelectedPostType) {
                const customizedPosts = posts.filter(post => post.postType == currentSelectedPostType)
                //console.log(customizedPosts)
                this.setState({myPosts: customizedPosts})
            }
        }, 300)
    }
    

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleShowAll = () => {
        const action = {type: 'unsetCurrentPostType'}
        store.dispatch(action)
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
                <div style={{float: 'right', marginRight: '50px'}}>
                        <Button variant='secondary' onClick={this.handleShowAll}>Show All</Button>
                </div>
            </div>
        )
    }

    createPostList = () => {
        return (
            <div className='posts-container'>
            {
            this.state.myPosts.map(
                post => (
                <PostCell 
                    data={post}
                    key={post.postId}
                    history={this.props.history}
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
