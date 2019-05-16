import React, { Component } from "react";
import axios from 'axios'

const SERVER_URL ='http://localhost:3333/auth/join'
class Signup extends Component {
 constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };

    this.getName = this.getName.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
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

signup(event) {
  event.preventDefault();
  axios.post(SERVER_URL, {name: this.state.name, userId: this.state.email, password: this.state.password}).then((result)=>{

    console.log(result);


    this.props.history.push('/login') ////
  })
}




  render() {
    return (
      <>
      <h2>SIGN UP!</h2>
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
          <input type="password"  value={this.state.password} onChange={this.getPassword} />
        </label>

        <input type="submit" value="Signup!" />

      </form>
      </>
    );
  }
}

export default Signup;
