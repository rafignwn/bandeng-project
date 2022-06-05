import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/baseUrl";
import "./loginStyles.css";

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const authHandler = async (e) => {
    e.preventDefault();
    try {
      document.cookie = `username=${username}`;
      let data = JSON.stringify({
        Username: username,
        Password: password,
      });
      await fetch(`${BASE_URL}/auth/Login`, {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="form-login">
      <div className="color"></div>
      <div className="color"></div>
      <div className="color"></div>
      <div className="box">
        <div
          className="square"
          style={{
            "--i": 0,
          }}
        ></div>
        <div
          className="square"
          style={{
            "--i": 1,
          }}
        ></div>
        <div
          className="square"
          style={{
            "--i": 2,
          }}
        ></div>
        <div
          className="square"
          style={{
            "--i": 3,
          }}
        ></div>
        <div
          className="square"
          style={{
            "--i": 4,
          }}
        ></div>
        <div className="container-login">
          <div className="form">
            <h2>Form Login</h2>
            <form onSubmit={authHandler}>
              <div className="input-box">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="input-box">
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
