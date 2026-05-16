import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./Signup.css";

const Signup = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");

 const handleSignup = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/users/register", {
      username,
      email,
      phoneNumber,
      password,
    });

    // save token
    localStorage.setItem("token", res.data.token);

    alert("Signup successful");

    // go to home (NOT login)
    navigate("/login");

  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="signup-container">

      <form className="signup-form" onSubmit={handleSignup}>

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Signup
        </button>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </form>

    </div>
  );
};

export default Signup;