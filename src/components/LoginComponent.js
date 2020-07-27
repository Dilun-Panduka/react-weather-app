import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const MainDiv = styled.div`
  width: 30%;
  height: 45vh;
  margin: 10% auto 10%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #131369c7;
  color: white;
  align-content: space-between;
`;

const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: auto 5% auto;
`;

const LoginBtn = styled.button`
  width: 30%;
  height: 5vh;
  align: right;
  background-color: lightgreen;
  border-radius: 5px
`;
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

  createURL() {
    return (
      USER_API_BASE_URL +
      "username=" +
      this.state.username +
      "&password=" +
      this.state.password
    );
  }

  basicAuthCreation() {
    return "Basic " + btoa("clientId:abcde");
  }

  render() {
    return (
      <MainDiv>
        <div>
          <h1 style={{ textAlign: "center" }}>Login</h1>
        </div>
        <FormDiv>
          Username:
          <input
            type="text"
            style={{ width: "80%", height: "4vh", borderRadius: "10px" }}
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <br />
          Password:
          <input
            type="password"
            style={{ width: "80%", height: "4vh", borderRadius: "10px" }}
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <br />
          <LoginBtn type="submit" onClick={this.login}>
            Login
          </LoginBtn>
        </FormDiv>
      </MainDiv>
    );
  }
}
export default LoginComponent;
