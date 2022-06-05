import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./buttonLogoutStyles.css";

export default function ButtonLogout() {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/logout",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className="btn-logout" onClick={logoutHandler}>
      Logout
    </button>
  );
}
