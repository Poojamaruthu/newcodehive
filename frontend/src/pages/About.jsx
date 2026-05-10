// pages/About.jsx

import "./About.css";

function About() {
  return (
    <div className="about">

      <h1>About SnippetHub</h1>

      <p>
        SnippetHub is a platform where developers can
        save, organize and share useful code snippets.
      </p>

      <div className="features">

        <div className="card">
          <h3>Save Snippets</h3>
          <p>Store your important code safely.</p>
        </div>

        <div className="card">
          <h3>Share Code</h3>
          <p>Share snippets with other developers.</p>
        </div>

        <div className="card">
          <h3>Easy Access</h3>
          <p>Access your snippets anytime.</p>
        </div>

      </div>

    </div>
  );
}

export default About;