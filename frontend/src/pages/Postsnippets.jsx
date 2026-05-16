import { useState } from "react";
import api from "../api/axios";
import "./Postsnippets.css";

const Postsnippets = () => {

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("public");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/snippets/create",
        {
          title,
          language,
          code,
          tags: tags.split(","),
          visibility,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Snippet posted successfully");

      console.log(res.data);

      // clear form
      setTitle("");
      setLanguage("");
      setCode("");
      setTags("");

    } catch (error) {
      console.log(error);
      alert("Failed to post snippet");
    }
  };

  return (
    <div className="post-container">

      <form className="post-form" onSubmit={handleSubmit}>

        <h1>Post a Snippet</h1>

        <input
          type="text"
          placeholder="Enter Code Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Programming Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        <textarea
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Tags (react, api, auth)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="visibility">

          <label>
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === "public"}
              onChange={() => setVisibility("public")}
            />
            Public
          </label>

          <label>
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === "private"}
              onChange={() => setVisibility("private")}
            />
            Private
          </label>

        </div>

        <button type="submit">
          Post Snippet
        </button>

      </form>

    </div>
  );
};

export default Postsnippets;