import React, { Component } from 'react'
import BigProfile from "../Sidebar/icons/BigProfile.png"
import { UserDeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default class FriendCell extends Component {
    constructor(props){
        super(props)
        this.data = this.props.data
        this.friendID = this.props.friendID
    }

    render() {
        const {name} = this.data
        return (
            <div>
                <img
                    src={BigProfile? BigProfile: null}
                    style={{
                      //marginTop: "100px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "39px",
                      marginRight:"20px"
                    }}
                    alt="default profile pic"
                  />
                {name}
                <div className='friend-buttons'>
                    <div className='friend-button-description'>
                    <Button shape="circle" 
                    icon={<MessageOutlined />} 
                    size={"30px"} />
                    </div>
                    <div className='friend-button-description'>
                    <Button shape="circle" 
                        icon={<UserDeleteOutlined />} 
                        size={"30px"} />
                    </div>
                </div>
            </div>
        )
    }
}
