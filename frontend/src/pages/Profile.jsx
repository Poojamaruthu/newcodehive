import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Profile.css";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [mySnippets, setMySnippets] = useState([]);

  const token = localStorage.getItem("token");

  // FETCH PROFILE
  const fetchProfile = async () => {
    try {

      const res = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // FETCH MY SNIPPETS
  const fetchMySnippets = async () => {
    try {

      const res = await api.get("/snippets/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMySnippets(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchMySnippets();
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">

      {/* TOP SECTION */}
      <div className="profile-card">

        <div className="avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>

        <h1>{user.username}</h1>

        <p>{user.email}</p>

        <div className="stats">

          <div>
            <h3>{mySnippets.length}</h3>
            <p>My Snippets</p>
          </div>

          <div>
            <h3>{user.saved?.length || 0}</h3>
            <p>Saved</p>
          </div>

        </div>

        <p className="joined">
          Joined:{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>

      </div>

      {/* USER SNIPPETS */}
      <h2>My Snippets</h2>

      <div className="snippet-grid">

        {mySnippets.map((snip) => (
          <div className="snippet-card" key={snip._id}>

            <h3>{snip.title}</h3>

            <p>{snip.language}</p>

            <pre>{snip.code}</pre>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Profile;