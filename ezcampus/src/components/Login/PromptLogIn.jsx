import React, { Component } from 'react'
import {Modal, Button} from 'react-bootstrap'

export default class PromptLogIn extends Component {
    constructor(props) {
        super(props)
        this.closePromptModal = props.closePrompt
        this.openLogin = props.openLogin
    }

    handleLater = () => {
        this.closePromptModal()
    }

    handleLogIn = () => {
        this.closePromptModal()
        this.openLogin()
    }

    render() {
        return (
            <Modal show={true}>
                <Modal.Body style={{paddingBottom:'10px'}}>
                    <p style={{textAlign:'center', fontFamily:'BasicSans', fontSize: '20px', color:'rgb(95, 98, 122)s'}}>
                        Please login/signup to proceed
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleLater}>
                        Later
                    </Button>
                    <Button variant="primary" onClick={this.handleLogIn}>
                        Login/Signup
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
