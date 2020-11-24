import React, {Component} from 'react';
import './Login.css'
import axios from 'axios'
import store from '../../store/Store'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { keyframes } from "styled-components";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;

class LoginPage extends Component{
    constructor(props) {
        
        super(props);
        this.state = {
            isSwitch:false,  //DO Not modify this
            isShowPassword: false,
            email:"",
            username:"",
            password:"",
            value:{},
            rememberUser: true
        }
        this.handleLoginSwitch = this.handleLoginSwitch.bind(this)
        this.handleSignUpSwitch = this.handleSignUpSwitch.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleEmailVerification=this.handleEmailVerification.bind(this)
        this.handlePasswordDisplay = this.handlePasswordDisplay.bind(this)
        this.eye  = eye
        
    }

    handleLoginSwitch(){
        this.setState({
            isSwitch:false,
        })
    }
    handleSignUpSwitch(){
        this.setState({
            isSwitch:true,
        })
    }
    handlePasswordDisplay= () =>{
        this.setState((preState)=>{
            return{isShowPassword: !preState.isShowPassword}
        })
    }

    handleRememberUser =() => {
        this.setState((preState) => {
            return {rememberUser: !preState.rememberUser}
        })
    }
    /*
    * input box handler
    * */
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleUserNameChange = (event) =>{
        this.setState({
            username:event.target.value,
        })

    }
    handlePasswordChange = (event) =>{
        this.setState({
            password:event.target.value,
        })
    }

   /*
   *Todo:The user click the login button, the function will be called
   **/
    handleLogin= (event) =>{
        event.preventDefault();
        const {email,password} = this.state
        axios.post('http://server.metaraw.world:3000/users/email_login', {
                'email': email,
                'password': password
            
        })
        .then(res => {
            //console.log(res)
            if (res.data.statusCode === 200) {
                const action = {
                    type: 'setEmailAndUserName',
                    data: {
                        email: res.data.user.email,
                        userName: res.data.user.userName
                    }
                }
                store.dispatch(action)
                this.props.closePopup()
                if (this.state.rememberUser){
                    localStorage.setItem('ezcampus_user_email', this.state.email)
                    localStorage.setItem('ezcampus_user_password', this.state.password)
                }

            }
        })
        .catch(err => {
            console.log(err.response)
            if (!err.response) return
            const errRes = err.response
            switch (errRes.status) {
                case 404: {
                    alert('user not found')
                    return
                }
                case 403: {
                    alert('wrong password')
                    return
                }
                default: {
                    return
                }
            }
        })
       
    }

    handleSignUp= (event) =>{
        event.preventDefault();
        const {email, username,password} = this.state
        axios.post('http://server.metaraw.world:3000/users/email_register', {
            'email': email,
            'userName': username, 
            'password': password
        })
        .then(res => {
            if (res.data.statusCode === 200) {
                const action = {
                    type: 'setEmailAndUserName',
                    data: {
                        email,
                        userName: username
                    }
                }
                store.dispatch(action)
                axios.post('http://server.metaraw.world:3000/users/profile/save', {
                    'loginEmail': email,
                    'userName': username, 
                    "aboutMe": "",
                    "avatarlink": "",
                    "city": "",
                    "contactEmail": "",
                    "phone": "",
                    "state": ""
                })
                .then(res => {
                    if (res.data.statusCode === 200) {
                        console.log('profile has been saved')
                    }
                })

                this.props.closePopup()
                //auto login next time
                if (this.state.rememberUser)
                    localStorage.setItem('ezcampus_user_auto_login', {email: this.state.email, password: this.state.password})
                
            }
        })
        .catch(err => {
            if (!err.response) return
            const errRes = err.response
            if (errRes.status === 403) {
                console.log(errRes.data)
                alert(errRes.data.message)
            }
        })
       
    }

    handleEmailVerification=()=>{
        alert("Email Verification -- not implement")
    }

    render() {
        let signup = {left:"700px"}
        let login = {left: "320px"}
        let btn = {left:"0px"}
        if(this.state.isSwitch){
            signup = {left: "320px"}
            login = {left:"700px"}
            btn = {left:"110px"}
        }
        // handler for the password display
        const type = this.state.isShowPassword ? 'text' : 'password'
        return (
            <div className={"popup"}>
                <div className={"Hero"}>
                    <div className={"form-box"}>
                        <button style={{float:"right", outline:"none",position:"relative",border:"0", borderRadius: '50%'}} type="button" onClick={this.props.closePopup}>x</button>
                        <div className={"left-image-box"}>
                        </div>
                        <div className={"button-box-li"}>
                            <div style={btn} id="btn_li"></div>
                            <button type="button" className="toggle-btn-li" onClick={this.handleLoginSwitch} >
                                login
                            </button>
                            <button  type="button" className="toggle-btn-li" onClick={this.handleSignUpSwitch} >
                                SignUp
                            </button>
                        </div>
                        <form style={login} className="input-group_li" onSubmit={this.handleLogin}>
                            <input type="text" className="input-field" placeholder="Email" required={'required'} onChange={this.handleEmailChange}/>
                            <div className={'wrapper'}>
                                 <input type={type} className="input-field-password" required={'required'} placeholder="Password" onChange={this.handlePasswordChange}/>
                                 <i className={"faeye"} onClick={this.handlePasswordDisplay}>{this.eye}</i>
                                 {/*ignore icon bug*/}
                                 <span></span>
                            </div>
                            <input
                                type="checkbox"
                                className="check-box"
                                placeholder="possword"
                                onChange={this.handleRememberUser}
                                checked={this.state.rememberUser}
                            />
                            <strong className={"spanText"}>Remember Me</strong>
                            <br />
                            <strong className={"spanText"}>Do you forget your password ?</strong>
                            <button
                                type={"button"}
                                style={{
                                    color:"red",
                                    background:"white",
                                    border:"none",
                                    outline:"none !important" }}
                                onClick={this.props.onToggleEmailVerification}
                            >reset</button>
                            <br />
                            <br />
                            <button type="submit" className="sumbit-btn-li">Login</button>
                        </form>

                        <form style={signup} className="input-group_li" onSubmit={this.handleSignUp}>
                            <input type="text" className="input-field" placeholder="Name" required={'required'}  onChange={this.handleUserNameChange}/>
                            <input type="email" className="input-field" placeholder="Email" required={'required'}  onChange={this.handleEmailChange}/>
                            <div className={'wrapper'}>
                                 <input type={type} className="input-field-password" placeholder="Password" required={'required'}  onChange={this.handlePasswordChange}/>
                                <i className={"faeye"} onClick={this.handlePasswordDisplay}>{this.eye}</i>
                                <span></span>
                            </div>
                            <input
                                type="checkbox"
                                className="check-box"
                                placeholder="possword"
                            /><strong className={"spanText"}>I agree with the term & condition</strong>
                            <button type="submit" className="sumbit-btn-li">SignUp</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginPage;

