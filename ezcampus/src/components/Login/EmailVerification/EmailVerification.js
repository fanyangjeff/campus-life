import React, {Component} from 'react';
import './EmailVerification.css'
import Spinning from "./Spinning";
import 'bootstrap/dist/css/bootstrap.min.css'
import Notifications, {notify} from 'react-notify-toast';
import Welcomeback from "./Welcomeback";
import {Form} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import axios from 'axios'

class EmailVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ' ',
            isEnterCode: false,
            isChangePassword: false,
            Password: '',
            RetypePassword: '',
            codeEmail: '',
            code: '',
            allSet: false,
        }
        this.handlerEmailInfo = this.handlerEmailInfo.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.HanderCodeChange = this.HanderCodeChange.bind(this)
        this.handlerChangeNewPassword1 = this.handlerChangeNewPassword1.bind(this)
        this.handlerChangeNewPassword2 = this.handlerChangeNewPassword2.bind(this)

    }

    handlerEmailInfo = (event) => {
        event.preventDefault();
        const {email, isEnterCode, isChangePassword, Password, RetypePassword, codeEmail, code} = this.state

        if (isChangePassword) {
            if (Password !== RetypePassword) {
                notify.show("The password does not match, Please, re-enter!")
            } else {
                console.log("HERE:", codeEmail, Password, RetypePassword)
                axios.post("https://server.metaraw.world/users/forget_password/reset_password", {
                    "codeEmail":codeEmail,
                    "password":Password,
                    }
                )
                    .then(res => {
                        // notify.show("Successful")
                        if (res.data.statusCode === 200) {
                            // notify.show("~~~~Successful~~~")
                            this.setState({
                                allSet: true,
                                RetypePassword: '',
                                isChangePassword: false,
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response)
                        if (!err.response) return
                        const errRes = err.response
                        switch (errRes.status) {
                            case 404: {
                                notify.show("unexpected Error,retry again ")
                                return
                            }
                            case 403: {
                                notify.show("Your account have not verified")
                                return
                            }
                            default: {
                                return
                            }
                        }
                    })
            }

        } else {
            if (isEnterCode) {
                console.log("Here is EnterCode: ", codeEmail, code)
                let myInt = parseInt(code);
                console.log(typeof (myInt), myInt, codeEmail)
                axios.get("https://server.metaraw.world/users/forget_password/verify", {params: {code, codeEmail}})
                    .then(res => {
                        if (res.data.statusCode === 200) {
                            notify.show('Chang your password')
                            this.setState({
                                isChangePassword: true,
                                code: '',
                                isEnterCode: false,
                            }, () => {
                                console.log(this.state.code)
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err.response)
                        if (!err.response) return
                        const errRes = err.response
                        switch (errRes.status) {
                            case 404: {
                                notify.show("Unpected error")
                                return
                            }
                            case 403: {
                                notify.show("verification code incorrect")
                                return
                            }
                            default: {
                                return
                            }
                        }
                    })
            } else {
                axios.get("https://server.metaraw.world/users/forget_password/send_email", {params: {email}})
                    .then(res => {
                        if (res.data.statusCode === 200) {
                            this.setState({
                                    isEnterCode: true,
                                    codeEmail: this.state.email,
                                    email: '',
                                }, () => {
                                    console.log(this.state.codeEmail)
                                }
                            )
                            notify.show('Check your access code in your email')
                        }
                    })
                    .catch(err => {
                        notify.show('invaild email, Please,retype again!')
                    })
            }
        }
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value,
        })
    }

    HanderCodeChange(e) {
        this.setState({
            code: e.target.value,
        })
    }

    handlerChangeNewPassword1(e) {
        this.setState({
            Password: e.target.value,
        })
    }

    handlerChangeNewPassword2(e) {
        this.setState({
            RetypePassword: e.target.value,
        })
    }

    render() {
        return (
            <div>
                {this.state.allSet ? <Welcomeback close={this.props.closePopup}/> :
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
                                {this.state.isChangePassword ? <div>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label
                                                style={{float: "left", padding: "5px 0px 5px 5px"}}>Password</Form.Label>
                                            <Form.Control type="password" placeholder="Password" required={"required"}
                                                          onChange={this.handlerChangeNewPassword1}/>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label
                                                style={{float: "left", padding: "5px 0px 5px 5px"}}>Re-type
                                                Password</Form.Label>
                                            <Form.Control type="password" placeholder="re-type your Password"
                                                          required={"required"}
                                                          onChange={this.handlerChangeNewPassword2}/>
                                        </Form.Group>
                                        <Form.Text className="text-muted">
                                            We'll never share your email and password with anyone else.
                                        </Form.Text>
                                        <br/>
                                    </div> :
                                    <Form.Group controlId="formBasicEmail">
                                        {this.state.isEnterCode ?
                                            <Form.Label style={{float: "left", padding: "5px 0px 5px 5px"}}>Enter your
                                                code:</Form.Label> :
                                            <Form.Label style={{float: "left", padding: "5px 0px 5px 5px"}}>Email
                                                address:</Form.Label>}
                                        {this.state.isEnterCode ? <Form.Control required={"required"} type="text"
                                                                                placeholder="Enter 6 digit verification code"
                                                                                value={this.state.code}
                                                                                onChange={this.HanderCodeChange}/> :
                                            <Form.Control required={"required"} value={this.state.email} type="email"
                                                          placeholder="Enter your email"
                                                          onChange={this.handleEmailChange}/>}
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                        <br/>
                                    </Form.Group>}
                                <Button variant="outline-primary" type={"Submit"}>
                                    submit
                                </Button>

                                <br/>
                                <br/>
                            </Form>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default EmailVerification;