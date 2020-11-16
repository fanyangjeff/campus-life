import React, {Component} from 'react';
import './EmailVerification.css'
import Spinning from "./Spinning";
import 'bootstrap/dist/css/bootstrap.min.css'
import Notifications, {notify} from 'react-notify-toast';
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            sendingEmail: false,
        }
        this.handlerEmailInfo = this.handlerEmailInfo.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    handlerEmailInfo = (event) => {
        event.preventDefault();
        const {email} = this.state
        notify.show('Sending email!');
        this.setState({
            sendingEmail: true,
        })
        {/*
        *Todo:if read data from Database success/failure,please let varible "success = true"
        **/
        }
        let success = false;

        if (success) {
            notify.show('Check your email box!');
            this.setState({
                sendingEmail: false,
            })
        }
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
    }

    render() {
        const {sendingEmail} = this.state
        return (
            <div className={"popup_email_li"}>
                <div className={"Hero_email_li"}>
                    <Notifications/>
                    <Form className={"center-mail-box-li"} onSubmit={this.handlerEmailInfo}>
                        <button style={{
                            float: "right",
                            outline: "none",
                            position: "relative",
                            border: "0",
                            borderRadius: "5px",
                            margin: "2px 3px 0px 0px"
                        }} type="button" onClick={this.props.closePopup}>x
                        </button>
                        <br/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{float: "left", padding: "5px 0px 5px 5px"}}>Email address:</Form.Label>
                            <Form.Control required={"required"} type="email" placeholder="Enter your email"
                                          onChange={this.handleEmailChange}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            <br/>
                        </Form.Group>
                        <Button variant="outline-primary" type={"Submit"} disabled={sendingEmail}>
                            {sendingEmail ? <Spinning/> : "submit"}
                        </Button>
                        <br/>
                        <br/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default EmailVerification;