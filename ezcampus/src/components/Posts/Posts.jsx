import React, { Component } from 'react'
import PostCell from './PostCell'
import { HomeOutlined } from '@ant-design/icons'
import './Post.css'
const data = [
    {
        id: '2232f-usfe-2323f23-2fdsf',
        creator: 'Jeff Yang',
        title: 'VOR 2b2b looking for housemate',
        description: 'We are looking for someone to share our apartment with. Housemate 1 is a ucsd graduate student, Housemate2 is a ucsd undergrad. No alchol, drugs ',
        date: '11/10/2020',
        type: 'housing',
        views: 10,
        likes: 8
    },
    {
        id: '223wef-usfe-2323f23-wefsf',
        creator: 'Liyuan Li',
        title: 'SFO 2b2b looking for housemate',
        description: "Move-in September 21, 2019, the rent will be prorated. A 12 - months minimum agreement or longer. Master bedroom size 15' x 14', fully furnished bedroom with a private entrance. This is a 2 bedroom 2 bathroom. Privileges included are Kitchen, living room, laundry. Utilities and WiFi not included. Must be clean, respectful and without drama. Please call for viewing",
        date: '11/10/2020',
        type: 'housing',
        views: 10,
        likes: 8
    },
    {
        id: '223wef-usfe-2323f23-wefsf',
        creator: 'Haolun',
        title: 'Used table from Ikea',
        description: "height adjustable office table, perfect for Zoom University. Asking price of $100",
        date: '11/10/2020',
        type: 'furniture trading',
        views: 10,
        likes: 8
    },
    {
        id: '223wef-usfe-2323f23-wefsf',
        creator: 'Haolun',
        title: 'Used table from Ikea',
        description: "height adjustable office table, perfect for Zoom University. Asking price of $100",
        date: '11/10/2020',
        type: 'furniture trading',
        views: 10,
        likes: 8
    },
    {
        id: '223wef-usfe-2323f23-wefsf',
        creator: 'Haolun',
        title: 'Used table from Ikea',
        description: "height adjustable office table, perfect for Zoom University. Asking price of $100",
        date: '11/10/2020',
        type: 'furniture trading',
        views: 10,
        likes: 8
    },
    {
        id: '223wef-usfe-2323f23-wefsf',
        creator: 'Haolun',
        title: 'Used table from Ikea',
        description: "height adjustable office table, perfect for Zoom University. Asking price of $100",
        date: '11/10/2020',
        type: 'furniture trading',
        views: 10,
        likes: 8
    },
    {
        id: '223wef-usfe-2323f23-wefsf',
        creator: 'Haolun',
        title: 'Used table from Ikea',
        description: "height adjustable office table, perfect for Zoom University. Asking price of $100",
        date: '11/10/2020',
        type: 'furniture trading',
        views: 10,
        likes: 8
    },
    {
        id: '223wef-usfe-2323f23-wefsf',
        creator: 'Haolun',
        title: 'Used table from Ikea',
        description: "height adjustable office table, perfect for Zoom University. Asking price of $100",
        date: '11/10/2020',
        type: 'furniture trading',
        views: 10,
        likes: 8
    }
]

export default class Posts extends Component {
    constructor(props) {
        super(props)
        this.data = data
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
            {this.data.map(
                data => (
                <PostCell 
                    data={data}
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
