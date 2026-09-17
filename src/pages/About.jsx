import React from "react";
import RoutingPanel from "../components/RoutingPanel.jsx";

export default function About() {
  return (
    <>
      <header>
        <span className="dot" aria-hidden="true" />
        <h1>About</h1>
      </header>
      <p className="status-text">
        <strong>Live</strong> — route: <code>/about</code>
      </p>

      <div className="panel">
        <h2>What this app is</h2>
        <p>
          This is a small React app built with Vite, meant to verify that a
          deployment pipeline actually installs dependencies, runs a build
          step, and serves the result correctly — rather than just checking
          that a static file exists.
        </p>
        <p>
          Unlike a traditional multi-page static site, every route here —
          Home, About, Status, even a URL that doesn't exist — is served
          from the same single <code>index.html</code> file. React Router
          reads the URL on load and decides what to render.
        </p>
      </div>

      <div className="panel">
        <h2>Why that matters for deployment</h2>
        <p>
          Because there's only one real HTML file, a direct visit to{" "}
          <code>/about</code> or <code>/status</code> — a page refresh, a
          bookmark, a shared link — has to be rewritten back to{" "}
          <code>index.html</code> by your host, or it will 404. This project
          includes a <code>public/_redirects</code> file with{" "}
          <code>/* /index.html 200</code> to handle that on Cloudflare
          Pages.
        </p>
      </div>

      <RoutingPanel />
    </>
  );
}
