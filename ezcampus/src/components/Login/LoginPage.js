import React, {Component} from 'react';
import './Login.css'
import axios from 'axios'
class LoginPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isSwitch:false,  //DO Not modify this
            username:"",
            password:"",
            value:{}
        }
        this.history = this.props.history
        this.handleLoginSwitch = this.handleLoginSwitch.bind(this)
        this.handleSignUpSwitch = this.handleSignUpSwitch.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleEmailVerification=this.handleEmailVerification.bind(this)
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

    /*
    * input box handler
    * */
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
        const {username,password} = this.state
        console.log(username, password)
        axios.post('http://fanyangjeff.pythonanywhere.com/signin', {
                'email': username,
                'password': password
            
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    /*
    *Todo:The user click on the signUP, the function will be called
    **/
    handleSignUp= (event) =>{
        //alert("SignUp----not implement")
        event.preventDefault();
        const {username,password} = this.state

        axios.post('http://fanyangjeff.pythonanywhere.com/signup', {
            'email': username,
            'userName': username, 
            'password': password
        })
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
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
        return (
            <div className={"popup"}>
                <div className={"Hero"}>
                    <div className={"form-box"}>
                        <button style={{float:"right", outline:"none",position:"relative",border:"0"}} type="button" onClick={this.props.closePopup}>x</button>
                        <div>
                            <img className={"left-image"}/>
                        </div>
                        <div className={"button-box"}>
                            <div style={btn} id="btn"></div>
                            <button type="button" className="toggle-btn" onClick={this.handleLoginSwitch} >
                                login
                            </button>
                            <button type="button" className="toggle-btn" onClick={this.handleSignUpSwitch} >
                                SignUp
                            </button>
                        </div>
                        <form style={login} className="input-group" onSubmit={this.handleLogin}>
                            <input type="text" className="input-field" placeholder="Email" onChange={this.handleUserNameChange}/>
                            <input type="text" className="input-field" placeholder="Password" onChange={this.handlePasswordChange}/>
                            <input
                                type="checkbox"
                                className="check-box"
                                placeholder="possword"
                            />
                            <span className={"spanText"}>Remember Password</span>
                            <br />
                            <span className={"spanText"}>Do you forget your password ?</span>
                            <button
                                type={"button"}
                                style={{
                                    color:"red",
                                    background:"white",
                                    border:"none",
                                    outline:"none"}}
                                onClick={this.handleEmailVerification}
                            >reset</button>
                            <br />
                            <br />
                            <button type="submit" className="sumbit-btn">Login</button>
                        </form>

                        <form style={signup} className="input-group" onSubmit={this.handleSignUp}>
                            <input type="text" className="input-field" placeholder="Name" />
                            <input type="email" className="input-field" placeholder="Email" onChange={this.handleUserNameChange}/>
                            <input type="text" className="input-field" placeholder="Password" onChange={this.handlePasswordChange}/>
                            <input
                                type="checkbox"
                                className="check-box"
                                placeholder="possword"
                            /><span className={"spanText"}>I agree with the term & condition</span>
                            <button type="submit" className="sumbit-btn">SignUp</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginPage;