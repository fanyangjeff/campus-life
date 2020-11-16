import React, { Component } from 'react'
import PostCell from './PostCell'
import { HomeOutlined } from '@ant-design/icons'
import './Post.css'
import axios from 'axios'


export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {posts: []}
    }

    componentDidMount() {
        axios.get('http://server.metaraw.world:3000/posts/get_all_posts')
        .then(res => {
            this.setState({posts: res.data.data})
        })
    }

    homeOutlinedHeader = () => {
        return (
            <div style={{marginLeft: '25px', marginTop: '20px'}}>
                <HomeOutlined style={{
                    fontSize:40,
                    float: "left"}}/>
                <div className='posts-homeOutLined'>
                    Home
                </div>
            </div>
        )
    }

    createPostList = () => {
        return (

            <div className='posts-container'>
            {this.state.posts.map(
                post => (
                <PostCell 
                    data={post}
                    key={post.postId}
                />
                ))}
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
