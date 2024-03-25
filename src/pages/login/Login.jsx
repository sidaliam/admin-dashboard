import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { AuthContext } from "../../context/Authcontext";
import axios from "axios";
const Login = () => {
  const [credentials, setcredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const {loading, error, dispatch } = useContext(AuthContext);
  const navigate=useNavigate()
  const handlechange = (e) => {
    setcredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if(res.data.isAdmin){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/")
        
      }
      else{
        dispatch({ type: "LOGIN_FAILURE"});

      }
     
    
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handlechange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlechange}
          className="lInput"
        />
        <button className="lButton" onClick={handleClick}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
