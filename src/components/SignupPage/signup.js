import React, { Component } from "react";
import axios from "axios";
import "./Signup.scss";
const SERVER_URL = "http://localhost:3333/auth/join";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };

    this.getName = this.getName.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.signup = this.signup.bind(this);
  }

  getName(event) {
    this.setState({
      name: event.target.value
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
    axios
      .post(SERVER_URL, {
        name: this.state.name,
        userId: this.state.email,
        password: this.state.password
      })
      .then(result => {
        console.log(result);

        this.props.history.push("/login"); ////
      });
  }

  render() {
    return (
      <>
        <div className="signup-container">
          <h2>Sign Up</h2>
          <form onSubmit={this.signup}>
            <input
              className="signup-input"
              type="text"
              value={this.state.name}
              onChange={this.getName}
              placeholder="Name"
            />

            <input
              className="signup-input"
              type="text"
              value={this.state.email}
              onChange={this.getEmail}
              placeholder="E-mail"
            />

            <input
              className="signup-input"
              type="password"
              value={this.state.password}
              onChange={this.getPassword}
              placeholder="Password"
            />

            <button className="signup-page-button" type="submit" value="">
              {" "}
              Sign Up
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Signup;
