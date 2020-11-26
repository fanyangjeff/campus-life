import React, { Component } from 'react'
import './Post.css'
import {Button} from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import { Link } from "react-router-dom";
import store from '../../store/Store'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, Space} from 'antd';

const deleteIcon = <FontAwesomeIcon icon={faTrashAlt}/>;

export default class PostCell extends Component {
    state = {
        visible: false
    }
    constructor(props) {
        super(props)
        this.history = props.history
        this.data = this.props.data
        this.postId = this.data.postId
    }


    handleClick = () => {
        console.log(this.postId)
        const action = {
            type: 'setCurrentVisitingPost',
            data: {
                post: this.data
            }
        }
        store.dispatch(action)
        //this.history.push( `/posts/${this.id}`)
    }

    verifyDelete = () => {
        this.setState({
            visible: true,
          });
    }

    handleDelete = () => {
        this.props.onDelete(this.postId)
    }

    handleCancel = () => {
        this.setState({visible: false})
    }

    render() {
        const {creatorName, creatorEmail, title, description, views, likes, date, postId, postType} = this.data
        const { email } = store.getState()
        return (
            <div className='single-post-container'>
                <div className='single-post-wrapper'>
                <div className='single-post-header'>
                <div style={{display: 'inline-block'}}>
                    <div style={{display: 'flex'}}>

                        <div className='single-post-creator'>
                            {creatorName? creatorName: 'unknown'}
                        </div>
                        <div className='single-post-type'>
                            {postType}  
                        </div>
                    </div>
                </div>

                    <span className='single-post-date'>
                    {email === creatorEmail ? 
                    <div style={{display:'inline-block'}}>
                        <Link onClick={this.verifyDelete}>
                            <i style={{paddingRight:'10px', color:'#07689f',fontSize:18}}>
                        {deleteIcon}
                        </i>
                        </Link>
                        <Modal
                            visible={this.state.visible}
                            onOk={(postId) => this.handleDelete()}
                            onCancel={this.handleCancel}
                         >
                        <p>Comfirm to delete post? </p>
                        </Modal>
                        </div>
                        : null}
                        {date}
                    </span>

                </div>

                <div className='single-post-title'>
                    {title}
                </div>

                <div className='single-post-description-box'>
                    <div className='single-post-description-text'>
                        {ReactHtmlParser(description)}

                    </div>
                </div>
                </div>
 
                <div className= 'single-post-detailButton-box'>
                   <Link to={`/posts/${this.postId}`}>
                        <Button variant='light' className='single-post-detailButton' onClick={this.handleClick}>View Details</Button>
                        {/* <DislikeOutlined className='single-post-likeButton' />
                        <LikeOutlined className='single-post-likeButton'/> */}
                    </Link>
                </div>
                  
            </div>
        )
    }
}