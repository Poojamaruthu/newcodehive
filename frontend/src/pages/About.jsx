import "./About.css";

function About() {
  return (
    <div className="about">

      {/* ── HERO ── */}
      <section className="about-hero">
        <span className="about-badge">✦ Who We Are</span>
        <h1>About <span className="about-accent">SnippetHub</span></h1>
        <p>
          SnippetHub is built for developers who are tired of losing track of useful code.
          We make it simple to save, organize, and share snippets — so you spend less time
          searching and more time building.
        </p>
      </section>

      {/* ── CARDS ── */}
      <section className="about-cards">
        <div className="card">
          <div className="card-icon">🗂️</div>
          <h3>Save Snippets</h3>
          <p>Store your important code safely in one place, always within reach.</p>
        </div>
        <div className="card">
          <div className="card-icon">🔗</div>
          <h3>Share Code</h3>
          <p>Share snippets instantly with teammates or the wider dev community.</p>
        </div>
        <div className="card">
          <div className="card-icon">⚡</div>
          <h3>Easy Access</h3>
          <p>Access your full library from any device, anytime, anywhere.</p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          We believe great code shouldn't get lost in chat threads or forgotten notes.
          SnippetHub gives every developer a personal, searchable library — so your best
          work is always one search away.
        </p>
      </section>

    </div>
  );
}

export default About;