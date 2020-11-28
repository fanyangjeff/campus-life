import React, { Component } from 'react'
import '../Posts/Post.css'
import {Button} from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import { Link } from "react-router-dom";
import store from '../../store/Store'
import BigProfile from "../Sidebar/icons/BigProfile.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {Modal, Space} from 'antd';

const deleteIcon = <FontAwesomeIcon icon={faTrashAlt}/>;

export default class MyPostCell extends Component {
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
        const action = {
            type: 'setCurrentVisitingPost',
            data: {
                post: this.data
            }
        }
        store.dispatch(action)
        this.history.push( `/posts/${this.postId}`)
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
        const { avatarlink } = store.getState()
        return (
            <div className='single-post-container'>
                <div className='single-post-wrapper'>
                <div className='single-post-header'>
                <div style={{display: 'inline-block'}}>
                    <div style={{display: 'flex'}}>
                        <div>
                            
                        <img
                        src={avatarlink? avatarlink: BigProfile}
                        style={{
                             //marginTop: "100px",
                             width: "40px",
                             height: "40px",
                            borderRadius: "39px",
                            marginRight:"20px"
                            }}
                        alt="default profile pic"
                        />
                        </div>
                        <div className='single-post-creator'>
                            {creatorName? creatorName: 'unknown'}
                        </div>
                        <div className='single-post-type'>
                            {postType}  
                        </div>
                    </div>
                </div>

                    <span className='single-post-date'>
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
                   
                        <Button variant='light' className='single-post-detailButton' onClick={this.handleClick}>View Details</Button>
                        {/* <DislikeOutlined className='single-post-likeButton' />
                        <LikeOutlined className='single-post-likeButton'/> */}
                    
                </div>
                  
            </div>
        )
    }
}