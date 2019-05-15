import React, { Component } from "react";

class Signup extends Component {
 constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    this.getName = this.getName.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.getConfirmPassword = this.getConfirmPassword.bind(this);
    this.signup = this.signup.bind(this);
 }


 getName(event) {
  this.setState({
    name: event.target.value,
  });
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

getConfirmPassword(event) {
  this.setState({
    confirmPassword: event.target.value
  });
}

signup(event) {
  console.log(
    'A name was submitted: ' + this.state.name,
    'Email ' + this.state.email,
    'Password ' + this.state.password,
    'confirmPassword ' + this.state.confirm);
  event.preventDefault();
}

  render() {
    return (
      <form onSubmit={this.signup}>

        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.getName} />
        </label>

        <label>
          Email:
          <input type="text" value={this.state.email} onChange={this.getEmail}/>
        </label>

        <label>
          Password:
          <input type="text"  value={this.state.password} onChange={this.getPassword} />
        </label>
        <label>

          Cofirm:
          <input type="text" value={this.state.confirmPassword} onChange={this.getConfirmPassword}  />
        </label>

        <input type="submit" value="Signup!" />

      </form>
    );
  }
}

export default Signup;
