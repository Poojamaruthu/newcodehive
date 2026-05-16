import { Link ,useNavigate} from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ token, setToken }) => {
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="logo">SnippetHub</div>

      <div className="nav-links">

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        {token ? (
          <>
            <Link to="/mylibrary">MyLibrary</Link>
            <Link to="/snippets">Snippets</Link>

            <Link to="/postsnippets">PostSnippets</Link>
            <Link to="/profile">Profile</Link>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
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