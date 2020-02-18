import React, { Component } from "react";
import "../styles/Login.css";
import axios from "axios";
// import { Redirect, } from "react-router-dom";


const URL_LOGIN = 'http://localhost:4000/api/login/loginuser/'

export default class PersonList extends Component {
  state = {
    login : {
        email : '',
        password : ''
    }
  };

  onChangeStateLogin = (e) => {
    let loginNew = this.state.login
    loginNew[e.target.name] = e.target.value;
    e.preventDefault();
    this.setState(
      {
        login : loginNew
      }  
    );
    // console.log(this.state.login)
    // console.log(e.target.name)
  };

  handleSubmitLogin = e => {
    e.preventDefault();
    this.postLogin();
  };

  postLogin = () => {
      console.log(this.state.login)
    axios.post(URL_LOGIN, this.state.login
    )
      .then((res) => {
        console.log(res.data)
        if(!res.data.token){
            console.log('wrong')
        }else{
            localStorage.setItem('Token', res.data.token)
            localStorage.setItem('id_cashier', res.data.id_user)
            window.location.href="http://localhost:3000/main"
        }
        
      })
      .catch(err => console.log(err));
    };

  render() {
    return (
      <div id="login">
        <h3 className="text-center text-white pt-5">Login form</h3>
        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form" action="" method="post">
                  <h3 className="text-center text-info">Login</h3>
                  <div className="form-group">
                    <label for="username" className="text-info">
                      Username:
                    </label>
                    <br />
                    <input
                      type="text"
                      name="email"
                      id="username"
                      className="form-control"
                      value={this.state.login.email}
                      onChange={this.onChangeStateLogin}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password" className="text-info">
                      Password:
                    </label>
                    <br />
                    <input
                      type="text"
                      name="password"
                      id="password"
                      className="form-control"
                      value={this.state.login.password}
                      onChange={this.onChangeStateLogin}
                    />
                  </div>
                  <div className="form-group">
                    <label for="remember-me" className="text-info">
                      <span>Remember me</span> 
                      <span>
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                        />
                      </span>
                    </label>
                    <br />
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="submit"
                      onClick={this.handleSubmitLogin}
                    />
                  </div>
                  <div id="register-link" className="text-right">
                    <a href="http://localhost:3000/login" className="text-info">
                      Register here
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
