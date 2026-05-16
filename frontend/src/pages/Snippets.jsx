import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Snippets.css";

const Snippets = () => {

  const [snippets, setSnippets] = useState([]);

  const fetchSnippets = async () => {
    try {

      const res = await api.get("/snippets/public");

      setSnippets(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  // SAVE
  const handleSave = async (id) => {
    try {

      const token = localStorage.getItem("token");

      await api.post(
        `/snippets/save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // UPDATE UI
      setSnippets((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                savedCount: (s.savedCount || 0) + 1,
              }
            : s
        )
      );

      alert("Snippet saved!");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Error saving snippet"
      );
    }
  };

  // COPY
  const handleCopy = (code) => {

    navigator.clipboard.writeText(code);

    alert("Copied!");
  };

  return (
    <div className="snippets-container">

      <h1>Public Snippets</h1>

      <div className="snippets-grid">

        {snippets.map((snip) => (

          <div
            key={snip.id}
            className="snippet-card"
          >

            <h2>{snip.title}</h2>

            <p className="language">
              {snip.language}
            </p>

            <pre className="code-box">
              {snip.code}
            </pre>

            <div className="actions">

              <button
                onClick={() =>
                  handleSave(snip.id)
                }
              >
                💾 Save (
                {snip.savedCount || 0}
                )
              </button>

              <button
                onClick={() =>
                  handleCopy(snip.code)
                }
              >
                📋 Copy
              </button>

            </div>

            <div className="meta">

              <span>
                👤 {snip.createdBy}
              </span>

              <span>
                📅{" "}
                {new Date(
                  snip.createdAt
                ).toLocaleDateString()}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Snippets;