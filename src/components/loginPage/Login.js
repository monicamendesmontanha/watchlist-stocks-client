import React, { Component } from "react";
import axios from "axios";
// import {ApolloProvider, ApolloConsumer, createNetworkInterface} from 'react-apollo'
import Router from 'react-router-dom';
import "./Login.scss";

const SERVER_URL ='http://localhost:3333/auth/login'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.getEmail = this.getEmail.bind(this);
    this.getPassword = this.getPassword.bind(this);
    this.login = this.login.bind(this);
    // this.gettingUserInfo = this.gettingUserInfo.bind(this)
    this.routeChange = this.routeChange.bind(this);

  }

  // gettingUserInfo(){
  //   console.log('userinfo fired');
  //   axios.get('http://localhost:3333/user/info', {withCredentials: true}).then((result)=>{ //need option?
  //     console.log('!!!!!!!!!axios result for userinfo fired: ', result);
  //   })

  // }

  routeChange() {
    let path = `/signup`;
    this.props.history.push(path);
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

  axios.post(SERVER_URL, {userId: this.state.email, password: this.state.password}, {withCredentials:true}).then((result)=>{

        console.log('here is what is going on result 1111', result) // this is the right one
        console.log('here is what is going on result.data 1111', result.data) // this is the right one
        console.log('here is what is going on result.data.data 1111', result.data.data)
        // console.log('here is what is going on data.request.response', result["request"])
        //result should be session

        this.props.history.push('/')
      }).then((result)=>{console.log("here is  what is going on 22:", result)}).then((aa)=>{
        console.log('getting info fired')
        // this.gettingUserInfo()
      })
      .then(aa => {
        console.log("getting info fired");
        // this.gettingUserInfo()
      });
  }

    ////// async
    ////// async
    ////// async////// async////// async////// async////// async////// async


      ////// async
      ////// async
      ////// async////// async////// async////// async////// async////// async


      //  async (req, res, next) => {

      //   try{

      //   if (!req.session.jwt) { // 세션에 토큰이 없으면
      //     const tokenResult = await axios.post(`http://localhost:3333/v1/token`, {
      //       clientSecret: process.env.CLIENT_SECRET,
      //     }); // 여기서 토큰 정보 리시브 완료

      //     if(tokenResult.data && tokenResult.data.code ===200){
      //       req.session.jwt = tokenResult.data.token; //req.session에다가 토큰 저장
      //                                                 //req.session과 res.session의 차이는?
      //     }else{
      //       return res.json(tokenResult.data)//api 서버가 아닌, 클라이언트에게! 보낼 때 res에다가 토큰의 결과를 보낸다.
      //     }
      //   }

      //   const result = await axios.get('http://localhost:3333/v1/test', {
      //     headers: {authorization: req.session.jwt} // 그다음 받은 토큰을 header에 집어 넣는다.  req.session과 res.session이 같을 필요는 없다. 여기서 바로 넣어 버릴거니까.
      //     //백엔드에서 그냥 바로 정보를 집어 넣어 버려라.
      //     // session 인증 백엔드에서 좀 바꾸도록 하자.
      //   });
      //   return res.json(result.data);

      //   }catch(error){ console.log(error)

      //   if(error.code===419){
      //   return res.json(error.response.data);
      //   }
      //   return next(error);
      //   }

      // })


      ///////////// async////// async////// async////// async////// async////// async////// async


    //   try{

    //   if (!req.session.jwt) { // 세션에 토큰이 없으면
    //     const tokenResult = await axios.post(`http://localhost:3333/v1/token`, {
    //       clientSecret: process.env.CLIENT_SECRET,
    //     }); // 여기서 토큰 정보 리시브 완료

    //     if(tokenResult.data && tokenResult.data.code ===200){
    //       req.session.jwt = tokenResult.data.token; //req.session에다가 토큰 저장
    //                                                 //req.session과 res.session의 차이는?
    //     }else{
    //       return res.json(tokenResult.data)//api 서버가 아닌, 클라이언트에게! 보낼 때 res에다가 토큰의 결과를 보낸다.
    //     }
    //   }

    //   const result = await axios.get('http://localhost:3333/v1/test', {
    //     headers: {authorization: req.session.jwt} // 그다음 받은 토큰을 header에 집어 넣는다.  req.session과 res.session이 같을 필요는 없다. 여기서 바로 넣어 버릴거니까.
    //     //백엔드에서 그냥 바로 정보를 집어 넣어 버려라.
    //     // session 인증 백엔드에서 좀 바꾸도록 하자.
    //   });
    //   return res.json(result.data);

    //   }catch(error){ console.log(error)

    //   if(error.code===419){
    //   return res.json(error.response.data);
    //   }
    //   return next(error);
    //   }

    // })

  render() {
    return (
      <>
        <h2>LOGIN!</h2>
        <form onSubmit={this.login}>
          <label>
            Email:
            <input
              type="text"
              value={this.state.email}
              onChange={this.getEmail}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={this.getPassword}
            />
          </label>

          <input type="submit" value="Login" />
        </form>
        <h3>New user? <button onClick={this.routeChange}>SIGNUP!</button></h3>

      </>
    );
  }
}


export default Login;
