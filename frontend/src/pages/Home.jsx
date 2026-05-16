import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <span className="hero-badge">✦ Code. Store. Share.</span>
        <h1>Your Personal <span className="hero-accent">Code Snippet</span> Hub</h1>
        <p>Save, organize, and share your code snippets — all in one clean workspace built for developers.</p>
        <div className="hero-btns">
          <button className="btn-primary">Explore Snippets</button>
          <button className="btn-outline">Get Started Free</button>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🗂️</div>
          <h3>Organize</h3>
          <p>Tag and filter snippets by language or category — find anything instantly.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Share</h3>
          <p>Generate a shareable link for any snippet in one click.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast & Secure</h3>
          <p>Lightning quick search with private and public visibility controls.</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-banner">
        <h2>Ready to organize your code?</h2>
        <p>Join thousands of developers already using SnippetHub.</p>
        <button className="btn-primary">Start for Free</button>
      </section>

    </div>
  );
}

export default Home;