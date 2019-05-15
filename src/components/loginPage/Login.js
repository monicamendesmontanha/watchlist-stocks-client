import React, { Component } from "react";
import axios from 'axios'

const SERVER_URL ='http://localhost:3333/auth/login'
class Login extends Component {

 constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.login = this.login.bind(this)
  }

  getEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  getPassword(event) {
    this.setState({
      password: event.target.value
    });
  }


  login(event) {
    event.preventDefault();
    console.log(
      'Email ' + this.state.email,
      'Password ' + this.state.password)

  axios.post(SERVER_URL, {userId: this.state.email, password: this.state.password}).then((result)=>{

        console.log('here is what is going on 1', result)
      
        this.props.history.push('/')
      }).then((result)=>{console.log("here is what is going on 2:", result);})
       

  } //function end

  render() {
    return (
      <>
      <h2>LOGIN!</h2>
      <form onSubmit={this.login}>

        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.getEmail}/>
        </label>

        <label>
          Password:
          <input type="password"  value={this.state.password} onChange={this.getPassword} />
        </label>

        <input type="submit" value="Login" />

      </form>
      <h3>New user? <button>SIGNUP!</button></h3>
      </>
    );
  }
}

export default Login;