import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

export default function RoutingPanel() {
  const location = useLocation();
  const { appLoadedAt } = useAppContext();
  const [pageRenderedAt] = useState(() => new Date());

  return (
    <div className="panel">
      <h2>Routing</h2>
      <p>
        This is a single-page app — all three routes are served from one{" "}
        <code>index.html</code>, and React Router swaps the content on the
        client. Compare the two timestamps below: "App loaded at" should stay
        the same as you click between pages, while "This page rendered at"
        changes each time, proving navigation isn't doing a full page reload.
      </p>
      <dl className="env-grid">
        <div className="env-item">
          <dt>Path</dt>
          <dd>{location.pathname}</dd>
        </div>
        <div className="env-item">
          <dt>App loaded at</dt>
          <dd>{appLoadedAt.toLocaleTimeString()}</dd>
        </div>
        <div className="env-item">
          <dt>This page rendered at</dt>
          <dd>{pageRenderedAt.toLocaleTimeString()}</dd>
        </div>
      </dl>
    </div>
  );
}
