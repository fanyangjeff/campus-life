import React, { Component } from 'react'
import PostCell from './PostCell'
import { HomeOutlined } from '@ant-design/icons'
import {Button} from 'react-bootstrap'
import './Post.css'
import store from '../../store/Store'


export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {posts: []}
        this.unsubscribe = store.subscribe(() => {
            const {posts, currentSelectedPostType} = store.getState()
            if (currentSelectedPostType) {
                const customizedPosts = posts.filter(post => post.postType == currentSelectedPostType)
                console.log(customizedPosts)
                this.setState({posts: customizedPosts})
            } else {
                this.setState({posts})
            }
        })
    }

    componentDidMount() {
        const {posts, currentSelectedPostType} = store.getState()

        if (currentSelectedPostType) {
            const customizedPosts = posts.filter(post => post.postType == currentSelectedPostType)
            console.log(customizedPosts)
            this.setState({posts: customizedPosts})
        } else {
            this.setState({posts})
        }
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleShowAll = () => {
        const action = {type: 'unsetCurrentPostType'}
        store.dispatch(action)
    }

    homeOutlinedHeader = () => {
        return (
            <div style={{marginLeft: '35px', marginTop: '20px'}}>
                <HomeOutlined style={{
                    fontSize:40,
                    float: "left"}}/>
                <div className='posts-homeOutLined'>
                    Home
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
            this.state.posts.map(
                post => (
                <PostCell 
                    data={post}
                    key={post.postId}
                />
                ))
                }
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className='posts-header'>
                    {this.homeOutlinedHeader()}
                </div>
                {this.createPostList()}
            </div>
        )
    }
}
