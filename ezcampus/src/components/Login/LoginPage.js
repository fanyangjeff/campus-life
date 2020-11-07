import React, {Component} from 'react';
import './Login.css'
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
    * input box onChange Handers
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
        alert("Login----not implement")
        event.preventDefault();
        const {username,password} = this.state
        // console.log(username)
        // console.log(password)
        // console.log(this.history)
        // try{
        //     db
        //         .auth()
        //         .signInWithEmailAndPassword(username, password);
        //     this.history.push("/");
        // } catch (error){
        //     alert(error);
        // }
    }
    /*
    *Todo:The user click on the signUP, the function will be called
    **/
    handleSignUp= (event) =>{
        alert("SignUp----not implement")
        event.preventDefault();
        const {username,password} = this.state
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
            <div style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: "auto",
                /*背景模糊*/
                background: "rgba(0,0,0, 0.5)"}}>
                <div className={"Hero"}>
                    <div className={"form-box"}>
                        <button style={{float:"right", outline:"none",position:"relative",border:"0"}} type="button" onClick={this.props.closePopup}>x</button>
                        <div>
                            <img className={"left-image"} src={"#"} alt={"LOGO"}/>
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
                            <input type="text" className="input-field" placeholder="UserId" onChange={this.handleUserNameChange}/>
                            <input type="text" className="input-field" placeholder="password" onChange={this.handlePasswordChange}/>
                            <input
                                type="checkbox"
                                className="check-box"
                                placeholder="possword"
                            />
                            <span>Remember Password</span>
                            <button type="submit" className="sumbit-btn">Login</button>
                        </form>

                        <form style={signup} className="input-group" onSubmit={this.handleSignUp}>
                            <input type="text" className="input-field" placeholder="UserId" />
                            <input type="email" className="input-field" placeholder="emailId" />
                            <input type="text" className="input-field" placeholder="possword" />
                            <input
                                type="checkbox"
                                className="check-box"
                                placeholder="possword"
                            /><span>I agree with the term & condition</span>
                            <button type="submit" className="sumbit-btn">SignUp</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default LoginPage;