// pages/Postsnippets.jsx

import "./Postsnippets.css";

const Postsnippets = () => {
  return (
    <div className="post-container">

      <form className="post-form">

        <h1>Post a Snippet</h1>

        {/* Code Title */}
        <input
          type="text"
          placeholder="Enter Code Title"
        />

        {/* Language Input */}
        <input
          type="text"
          placeholder="Enter Programming Language"
        />

        {/* Code Area */}
        <textarea
          placeholder="Paste your code here..."
        ></textarea>

        {/* Tags */}
        <input
          type="text"
          placeholder="Enter Tags (react, api, auth)"
        />

        {/* Public / Private */}
        <div className="visibility">

          <label>
            <input
              type="radio"
              name="visibility"
            />
            Public
          </label>

          <label>
            <input
              type="radio"
              name="visibility"
            />
            Private
          </label>

        </div>

        {/* Submit Button */}
        <button type="submit">
          Post Snippet
        </button>

      </form>

    </div>
  );
};

export default Postsnippets;