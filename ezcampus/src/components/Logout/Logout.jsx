import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'
import store from '../../store/Store'
export default class Logout extends Component {
    constructor(props) {
        super(props)
        this.state = {userName: '', show: true}
    }
    componentDidMount() {
        const {userName} = store.getState()
        this.closeModal = this.props.closePopup
        this.setState({userName})
    }

    handleCancel = () => {
        this.closeModal()
    }

    handleLogout = () => {
        const action = {
            type: 'unsetEmailAndUserName'
        }
        store.dispatch(action)
        //localStorage.removeItem('ezcampus_username')
        localStorage.removeItem('ezcampus_user_password')
        this.closeModal()
    }

    render() {
        return (
            <div>
                <Modal show={true}>
                    <Modal.Header>
                        <Modal.Title>
                            {this.state.userName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Would you like to Log out?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={this.handleLogout}>
                            Log out
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
