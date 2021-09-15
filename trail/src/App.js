import "./App.css";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Contianer = styled.div`
  border: 20%;
  // line-height: 30px;
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
`;

const Contianer_text = styled.input`
  border-radius: 5%;
  border: none;
  outline: none;
  background-color: black;
  padding: 20px;
  color: white;
  text-align: center;
  margin: 20px;
`;

const Contianer_btn = styled.button`
  border-radius: 5%;
  border: 2px solid black;
  outline: none;
  background-color: white;
  padding: 20px;
  text-align: center;
  margin: 20px;
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
`;

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [updateusername, setUpdateusername] = useState("");
  const [updatepassword, setUpdatepassword] = useState("");

  const [display, setDisplay] = useState([]);

  const Submit = () => {
    console.log("called");
    axios
      .post("http://localhost:3001/submit", {
        user_name: username,
        user_password: password,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const displayAll = () => {
    axios.post("http://localhost:3001/display").then((response) => {
      console.log(response);
      setDisplay(response.data);
    });
  };

  const onDelete = (val) => {
    axios
      .post("http://localhost:3001/delete", {
        deleteId: val.id,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const onUpdate = (val) => {
    console.log("yo", updateusername, updatepassword);
    axios
      .post("http://localhost:3001/update", {
        id: val.id,
        username: updateusername,
        password: updatepassword,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h6>hi there!</h6>
        <Contianer>
          <Contianer_text
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
          <Contianer_text
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Contianer_btn onClick={Submit} type="button">
            Submit
          </Contianer_btn>
        </Contianer>
        <Contianer_btn onClick={displayAll}>Display All</Contianer_btn>

        {display.map((val) => {
          return (
            <>
              <div>
                {val.username} | {val.password}
                <Contianer_btn onClick={() => onDelete(val)}>
                  Delete
                </Contianer_btn>
                {/* {val.username} | {val.password} */}
                <Contianer_text
                  type="text"
                  placeholder="Update the name"
                  onChange={(e) => setUpdateusername(e.target.value)}
                ></Contianer_text>
                <Contianer_text
                  type="text"
                  placeholder="Update the password"
                  onChange={(e) => setUpdatepassword(e.target.value)}
                ></Contianer_text>
                <Contianer_btn onClick={() => onUpdate(val)}>
                  Update
                </Contianer_btn>
              </div>
            </>
          );
        })}

        <h4>
          username: {username} || password: {password}
        </h4>
      </header>
    </div>
  );
}

export default App;
