import React, { Component } from 'react'
import PostCell from './PostCell'
import { HomeOutlined } from '@ant-design/icons'
import {Button, DropdownButton, Dropdown} from 'react-bootstrap'
import './Post.css'
import store from '../../store/Store'
import axios from 'axios';
import API_PREFIX from '../../API_PREFIX'


export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.history = props.history
        this.state = {
            posts: [],
            title_name:'Home'
        }
        this.unsubscribe = store.subscribe(() => {
            const {posts, currentSelectedPostType} = store.getState()
            if (currentSelectedPostType) {
                const customizedPosts = posts.filter(post => post.postType == currentSelectedPostType)
                console.log(customizedPosts)
                console.log(currentSelectedPostType)
                this.setState({posts: customizedPosts})
            } else {
                this.setState({posts})
            }
        })
    }

    componentDidMount() {
        const {posts, currentSelectedPostType} = store.getState()
        console.log('checking',currentSelectedPostType)
        if (currentSelectedPostType) {
            const customizedPosts = posts.filter(post => post.postType == currentSelectedPostType)
            console.log(customizedPosts)
            this.setState({
                posts: customizedPosts,
                title_name: currentSelectedPostType,
            })
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
        this.setState({
            title_name:'Home',
        })
    }

    handleDelete = postId => {
        axios.delete(`${API_PREFIX}/posts/delete_a_post`, 
        {params: {postId}})
        .then(res => {
            if(res.data.statusCode === 200){
                const posts = this.state.posts.filter(post => post.postId !== postId);
                this.setState({posts})
                const action = {
                    type: 'setPosts', 
                    data: {posts: this.state.posts}
                }
                store.dispatch(action)
            }
        })
    }

    handleClick = (postType) => {
        const action = {type: 'setSelectedPostType', data: {postType}}
        store.dispatch(action)
        this.history.push('/posts')
        this.setState({
            title_name: postType
        })
    }

    homeOutlinedHeader = () => {
        return (
            <div style={{marginLeft: '35px', marginTop: '20px', marginBottom:'10px'}}>
                <HomeOutlined style={{
                    fontSize:40,
                    float: "left"}}/>
                <div className='posts-homeOutLined'>
                    {this.state.title_name}
                </div>
                <div style={{float: 'right', marginRight: '50px'}}>
                        {/* <Button variant='secondary' onClick={this.handleShowAll}>Show All</Button> */}
                    <DropdownButton variant="secondary" 
                    id={`dropdown-button-drop-${'left'}`} 
                    drop={'left'} title={'Category'}>
                    <Dropdown.Item eventKey="1"
                        onClick={this.handleShowAll}>
                            Show All
                            </Dropdown.Item>
                    <Dropdown.Item 
                    eventKey="2" 
                    onClick={() => {this.handleClick('Free or For Sale')}}>
                        Free or For Sale
                        </Dropdown.Item>
                    <Dropdown.Item eventKey="3"
                    onClick={() => {this.handleClick('Ride Sharing')}}>
                        Ride Sharing
                        </Dropdown.Item>
                    <Dropdown.Item eventKey="3"
                    onClick={() => {this.handleClick('Cutie Pets')}}>
                        Cutie Pets</Dropdown.Item>
                    <Dropdown.Item eventKey="3"
                    onClick={() => {this.handleClick('Housing')}}>
                        Housing</Dropdown.Item>
                    <Dropdown.Item eventKey="3" 
                    onClick={() => {this.handleClick('Entertainment')}}>
                        Entertainment</Dropdown.Item>
                    <Dropdown.Item eventKey="3"
                    onClick={() => {this.handleClick('Others')}}>
                        Others</Dropdown.Item>
                    </DropdownButton>
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
                <div className='posts-header'>
                    {this.homeOutlinedHeader()}
                </div>
                {this.createPostList()}
            </div>
        )
    }
}
