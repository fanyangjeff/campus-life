import React, { Component } from 'react'
import './Post.css'
import {Button} from 'react-bootstrap'

export default class PostCell extends Component {
    constructor(props) {
        super(props)
        this.data = this.props.data
        this.id = this.props.id
    }

    componentDidMount() {
        console.log(this.data)
    }

    render() {
        const {creator, title, description, views, likes, date, id, type} = this.data

        return (
            <div className='single-post-container'>
                <div className='single-post-wrapper'>
                <div className='single-post-header'>
                <div style={{display: 'inline-block'}}>
                    <div style={{display: 'flex'}}>

                        <div className='single-post-creator'>
                            {creator}
                        </div>
                        <div className='single-post-type'>
                            {type}  
                        </div>
                    </div>
                </div>

                    <span className='single-post-date'>
                        {date}
                    </span>
                </div>

                <div className='single-post-title'>
                    {title}
                </div>

                <div className='single-post-description-box'>
                    <div className='single-post-description-text'>
                        {description}
                    </div>
                </div>
                </div>

                <div className= 'single-post-detailButton-box'>
                    <Button variant='light' className='single-post-detailButton'>View Details</Button>
                </div>
            </div>
        )
    }
}
