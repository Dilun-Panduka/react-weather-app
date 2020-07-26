import React, { Component } from "react";
import axios from "axios";
const USER_API_BASE_URL =
  "http://localhost:8080/oauth/token?scope=write&grant_type=password&";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.login = this.login.bind(this);
  }
  componentDidMount() {
    localStorage.clear();
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  login = (e) => {
    e.preventDefault();
    let URL = this.createURL();
    let basicAuth = this.basicAuthCreation();
    
    axios
      .post(URL, {}, { headers: { Authorization: basicAuth } })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.props.history.push("/home");
        }
      })
      .catch((error) => {
        window.alert("Not Authorized");
      });
  };

  createURL(){
    return USER_API_BASE_URL +
    "username=" +
    this.state.username +
    "&password=" +
    this.state.password;
  }

  basicAuthCreation() {
    return "Basic " + btoa("clientId:abcde");
  }

  render() {
    return (
      <div style={{ color: "black" }}>
        <h1>Login</h1>
        <form>
          Username:
          <input
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <button type="submit" onClick={this.login}>
            Login
          </button>
        </form>
      </div>
    );
  }
}
export default LoginComponent;
