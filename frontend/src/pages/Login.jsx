
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">

      <form className="login-form">

        <h1>Login</h1>

        <input
          type="text"
          placeholder="Enter Username"
        />

        <input
          type="password"
          placeholder="Enter Password"
        />

        <button type="submit">
          Login
        </button>

        <p className="signup-link">
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </p>

      </form>

    </div>
  );
};

export default Login;