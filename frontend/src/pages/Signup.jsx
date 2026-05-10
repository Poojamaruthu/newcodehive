import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-container">

      <form className="signup-form">

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Enter Username"
        />

        <input
          type="email"
          placeholder="Enter Email"
        />

        <input
          type="tel"
          placeholder="Enter Phone Number"
        />

        <input
          type="password"
          placeholder="Enter Password"
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