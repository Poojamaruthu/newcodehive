import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Snippets from "./pages/Snippets";
import MyLibrary from "./pages/MyLibrary";
import PostSnippets from "./pages/Postsnippets";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>

      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/snippets" element={<Snippets />} />
        <Route path="/mylibrary" element={<MyLibrary />} />
        <Route path="/postsnippets" element={<PostSnippets />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

    </Router>
  );
}

export default App;