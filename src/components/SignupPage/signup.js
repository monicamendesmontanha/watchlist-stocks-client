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
      // confirmPassword: ''
    };

    this.getName = this.getName.bind(this);
    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    // this.getConfirmPassword = this.getConfirmPassword.bind(this);
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

// getConfirmPassword(event) {
//   this.setState({
//     confirmPassword: event.target.value
//   });
// }

//  signup key: 9d110eef-4b99-43a3-9b06-39234e26491c

signup(event) {
  event.preventDefault();

  // console.log(
  //   'Name: ' + this.state.name,
  //   'Email ' + this.state.email,
  //   'Password ' + this.state.password,
  //   // 'confirmPassword ' + this.state.confirm
  //   );

  // name, userId, password



  axios.post(SERVER_URL, {name: this.state.name, userId: this.state.email, password: this.state.password}).then((result)=>{

    console.log(result);
    this.props.history.push('/login')
  })

//   saveFlight(number, origin, destination, date) {

//     axios.post(SERVER_URL, {flight_number: number, origin: origin, destination: destination, date: date }).then((result) => {
//         this.setState({flights: [...this.state.flights, result.data]});
//     });
// } 

} // this is the end of function 

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

        {/* <label>

          Confirm Password:
          <input type="text" value={this.state.confirmPassword} onChange={this.getConfirmPassword}  />
        </label> */}


        <input type="submit" value="Signup!" />

      </form>
      </>
    );
  }
}

export default Signup;
