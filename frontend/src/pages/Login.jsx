import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import './Login.css'

const Login = ({ setToken }) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/users/login", {
        email,
        password,
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // 🔥 THIS IS THE MAIN FIX
      setToken(res.data.token);

      alert("Login successful");

      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
  <div className="login-container">

    <form className="login-form" onSubmit={handleLogin}>

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

    </form>

  </div>
);
};

export default Login;