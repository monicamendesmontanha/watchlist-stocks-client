import React, { Component } from "react";

class Login extends Component {

 constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
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
    console.log(
      'Email ' + this.state.email,
      'Password ' + this.state.password);
    event.preventDefault();
  }

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
          <input type="text"  value={this.state.password} onChange={this.getPassword} />
        </label>

        <input type="submit" value="Login" />

      </form>
      <h3>New user? <button>SIGNUP!</button></h3>
      </>
    );
  }
}

export default Login;