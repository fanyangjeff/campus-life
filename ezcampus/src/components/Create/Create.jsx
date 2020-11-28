import React, { Component } from 'react'
import {useHistory} from 'react-router-dom'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorInput from 'react-froala-wysiwyg'
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/font_awesome.min.js';
import FroalaEditorView from 'react-froala-wysiwyg'
import Button from 'react-bootstrap/Button';
import './CreatePost.css';
import uuid from 'react-uuid';
import store from '../../store/Store'
import axios from 'axios'
import API_PREFIX from '../../API_PREFIX'
import FormData from 'form-data'
import { Redirect } from "react-router-dom";


export default class Create extends Component {
    constructor(props) {
        super(props)
        this.history = props.history
        this.state = {creatorEmail: '', creatorName: '', description: '', title: '', postType: 'Free or For Sale', redirect:false};
    
    }

    componentDidMount() {

        let interval = setInterval(() => {
            const {isLoading} = store.getState()
            if (!isLoading) {
                clearInterval(interval)
                const {isLoggedIn} = store.getState()
                //if the user hasn't logged in, then redirect the user to the Post component
                if (!isLoggedIn) {
                    //after the user gets redirected to the Post component, we need to show PromptlogIn Modal
                    const action = {type: 'setShowPromptLogIn'}
                    store.dispatch(action)
                    this.history.push('/posts')
                }
            }
        }, 5)


        store.subscribe(() => {
            let interval = setInterval(() => {
                const {isLoading} = store.getState()
                if(!isLoading) {
                    clearInterval(interval)
                    const {isLoggedIn} = store.getState()
                    if (!isLoggedIn) {
                        this.history.push('/posts')
                    }
                }
            }, 5)

        })
    }


    updateTitle = (e) => {
        this.setState({title: e.target.value})
    }

    updateType = (e) => {
        console.log(e.target.value)
        this.setState({postType: e.target.value})
    }

     
    updateEditerComponentText = (e) => {
        this.setState({description: e})
    }
    handleRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to="/posts"/>;
      }
    };

    cancelPost = () => {
        this.setState({redirect:true})
    }

    submitPost = () => {

        //check if the title or description is left empty
        const {isLoggedIn} = store.getState()
        if (isLoggedIn == false) {
            alert('please signup/login first')
            return
        }

        if (this.state.title == '') {
            alert('please enter a valid title')
            return
        }

        if (this.state.description == '') {
            alert('Description cannot be empty')
            return
        }


        const {userName, email} = store.getState()


        //some other info is required for making a post
        const otherInfo = {
            date: new Date().toLocaleString('en-GB', { timeZone: 'PST' }),
            views: 0,
            likes: 0,
            postId: uuid()
        }

        
        //since setState is aysnc, the aixos API call need to be placed in its callback function
        
        this.setState({creatorName: userName, creatorEmail:email}, () => {
            axios.post(`${API_PREFIX}/posts/create_a_post`, {
                ...this.state,
                ...otherInfo
            })
            .then(res => {
                if (res.data.statusCode == 200) {
                    console.log('post has been created')
                    const action = {type: 'addPost', data: {newPost: {...this.state, ...otherInfo}}}
                    store.dispatch(action)
                    // this.history.push('/posts')
                    this.setState({redirect:true})
                }
            })
        })
    }


    render() {
        return (
            <div>
                {this.handleRedirect()}
                <br/>
                <h2>Create Post</h2>
                <br/>
                <br/>

                <form>
                    <div className="form-group">
                        <label><strong>Title</strong></label>
                        <input type="text" className="form-control"
                               placeholder="Please enter the title of this post"
                               onChange={this.updateTitle}/>
                    </div>
                    <div className="form-group">
                        <label><strong>Category</strong></label>
                        <select className="form-control" id="postCategory" onChange={this.updateType}>
                            <option>Free or For Sale</option>
                            <option>Ride Sharing</option>
                            <option>Cutie Pets</option>
                            <option>Housing</option>
                            <option>Entertainment</option>
                            <option>Others</option>
                        </select>
                    </div>
                </form>
                <div className='create-post-text-area'>
                <p><strong>Description</strong></p>
                <FroalaEditorComponent tag={'textarea'} config={{
                    placeholderText: 'Write the details here!',
                    imageDefaultWidth: 500,
                    imageUpload: true,
                    events: {
                            'image.beforeUpload': function (images) {                           
                            const data = new FormData();
                            data.append('image', images[0]);
                            axios.post('https://api.imgur.com/3/image', data, {
                                headers: {
                                    'Authorization': 'Client-ID c9897a7d288d020'
                                }
                            }).then(res => {                                
                                console.log(this);
                                this.image.insert(res.data.data.link);
                            });

                            return false;
                        }
                    },
                    charCounterCount: true
                }} onModelChange={this.updateEditerComponentText}/>
                </div>
                <br/>
                <div>
                    <Button type="button" id="creat-post-cancel"
                            className="btn btn-secondary float-right btn-lg ml-3"
                            onClick={this.cancelPost}>
                        <strong>Cancel</strong>
                    </Button>
                    <Button type="button" id="creat-post-send"
                            className="btn btn-success float-right btn-lg"
                            onClick={this.submitPost}>
                        <strong>Send</strong>
                    </Button>
                </div>
            </div>
        )
    }
}
