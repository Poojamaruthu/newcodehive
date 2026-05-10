import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">

      <h2 className="logo">SnippetHub</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {isLoggedIn && (
          <>
            <Link to="/mylibrary">MyLibrary</Link>

            <Link to="/postsnippets">
              PostSnippets
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;