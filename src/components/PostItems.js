import React, { Component } from "react";
import Axios from "axios";
import styled from "styled-components";

const MainDiv = styled.div`
  width: 50%;
  height: 40vh;
  margin: 15% auto 10%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #131369c7;
  color: white;
  align-content: space-between;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const Info = styled.div`
  width: 30%;
  height: 8vh;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: auto;
  padding: 5px;
  color: white;
`;

const LogoutBtn = styled.button`
  width: 100%;
  height: 5vh;
  align: right;
  background-color: Grey;
  color: white;
  border-radius: 5px
`;
const city = [
  { CityCode: "1248991", CityName: "Colombo", Temp: "33.0", Status: "Clouds" },
  { CityCode: "1850147", CityName: "Tokyo", Temp: "8.6", Status: "Clear" },
  { CityCode: "2644210", CityName: "Liverpool", Temp: "16.5", Status: "Rain" },
  { CityCode: "2988507", CityName: "Paris", Temp: "22.4", Status: "Clear" },
  { CityCode: "2147714", CityName: "Sydney", Temp: "27.3", Status: "Rain" },
  { CityCode: "4930956", CityName: "Boston", Temp: "4.2", Status: "Mist" },
  { CityCode: "1796236", CityName: "Shanghai", Temp: "10.1", Status: "Clouds" },
  { CityCode: "3143244", CityName: "Oslo", Temp: "-3.9", Status: "Clear" },
];

class PostItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CityName: "",
      description: "",
      temp: "",
    };
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout = (e) =>{
    e.preventDefault();
    localStorage.clear();
    this.props.history.push("/");
  }

  onChange(e) {
    Axios.get(
      "http://api.openweathermap.org/data/2.5/group?id=" +
        e.target.value +
        "&units=metric&appid=0aaacf61bfc984c8e7ea1a19b00cc414"
    ).then((response) => {
      this.bindData(response);
    });
  }

  bindData(response){
    this.setState({
      CityName: response.data.list[0].name,
      description: response.data.list[0].weather[0].description,
      temp: response.data.list[0].main.temp + " °C",
    });
  }

  render() {
    return (
      <MainDiv>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div></div>
          <div>
            <h1 style={{ textAlign: "center" }}>Weather Report</h1>
          </div>
          <div>
            <LogoutBtn onClick={this.logout}>Logout</LogoutBtn>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <form onChange={this.onChange}>
            <div>
              <label style={{ fontSize: "20px", fontFamily: "calibri" }}>
                Select Country:{" "}
              </label>
              <br />
              <select
                style={{
                  width: "50%",
                  fontFamily: "calibri",
                  fontSize: "15px",
                }}
              >
                <option selected disabled>
                  Select a Country
                </option>
                {city.map((c) => (
                  <option key={c.CityCode} value={c.CityCode}>
                    {c.CityName}
                  </option>
                ))}
                ;
              </select>
            </div>
          </form>
        </div>
        <br />
        <InfoDiv>
          <Info style={{ backgroundColor: "#0d9a73" }}>
            <span>Location :</span>
            <span style={{ textAlign: "center" }}>{this.state.CityName}</span>
          </Info>
          <Info style={{ backgroundColor: "#172727" }}>
            <span>Description :</span>
            <span style={{ textAlign: "center" }}>
              {this.state.description}
            </span>
          </Info>
          <Info style={{ backgroundColor: "red" }}>
            <span>Temperature :</span>
            <span style={{ textAlign: "center" }}>{this.state.temp}</span>
          </Info>
        </InfoDiv>
      </MainDiv>
    );
  }
}
export default PostItems;
