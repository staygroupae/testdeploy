import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import RoutingPanel from "../components/RoutingPanel.jsx";

export default function Status() {
  const { statusVisits, recordStatusVisit } = useAppContext();

  useEffect(() => {
    recordStatusVisit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header>
        <span className="dot" aria-hidden="true" />
        <h1>Status</h1>
      </header>
      <p className="status-text">
        <strong>Live</strong> — route: <code>/status</code>
      </p>

      <div className="panel">
        <h2>Persisted app state</h2>
        <p>
          This counter lives in a React Context at the app's root, not in
          this page component. Leave this page and come back — the number
          keeps climbing instead of resetting, because the app itself never
          unmounted, only this route's content changed.
        </p>
        <dl className="env-grid">
          <div className="env-item">
            <dt>Visits to this page this session</dt>
            <dd>{statusVisits}</dd>
          </div>
        </dl>
      </div>

      <RoutingPanel />
    </>
  );
}
