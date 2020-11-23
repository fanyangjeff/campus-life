import React, { Component } from 'react'
import BigProfile from "../Sidebar/icons/BigProfile.png"
import { UserDeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { Button, Modal, Space} from 'antd';

export default class FriendCell extends Component {
    constructor(props){
        super(props)
        this.data = this.props.data
        this.friendID = this.data.id
        
    }
    state = { visible: false };

    verifyDelete = () =>{
        this.setState({
            visible: true,
          });
    };

    handleDelete = () => {
        this.props.onDelete(this.friendID)
        this.setState({visible: false})
    }

    handleCancel= () => {
        this.setState({visible: false})
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
                        size={"30px"} 
                        onClick={this.verifyDelete}
                        />
                        <Modal
                            visible={this.state.visible}
                            onOk={this.handleDelete}
                            onCancel={this.handleCancel}
                         >
                        <p>Comfirm to remove <span style={{fontWeight:"bold"}}>{name}</span> from contact?</p>
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}
