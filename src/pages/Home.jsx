import React, { useEffect, useState, useCallback } from "react";
import RoutingPanel from "../components/RoutingPanel.jsx";

function pad(n) {
  return String(n).padStart(2, "0");
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useViewport() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    function onResize() {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

export default function Home() {
  const now = useClock();
  const viewport = useViewport();
  const [pings, setPings] = useState([]);
  const [reactVersion, setReactVersion] = useState("");

  useEffect(() => {
    setReactVersion(React.version);
  }, []);

  const logPing = useCallback(() => {
    setPings((prev) => {
      const next = [{ n: prev.length + 1, t: new Date().toLocaleTimeString() }, ...prev];
      return next.slice(0, 30);
    });
  }, []);

  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

  const envItems = [
    ["Loaded at", new Date().toLocaleTimeString()],
    ["Protocol", (location.protocol || "unknown").replace(":", "")],
    ["Host", location.host || "local file"],
    ["Viewport", `${viewport.w} × ${viewport.h}`],
    ["React version", reactVersion || "…"],
    ["Connection", conn && conn.effectiveType ? conn.effectiveType : "unavailable"]
  ];

  return (
    <>
      <header>
        <span className="dot" aria-hidden="true" />
        <h1>Deploy check</h1>
      </header>
      <p className="status-text">
        <strong>Live</strong> — built with React {reactVersion || "…"}
      </p>

      <div className="clock">
        {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
      </div>
      <div className="date">
        {now.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
      </div>

      <div className="panel">
        <h2>Environment</h2>
        <dl className="env-grid">
          {envItems.map(([label, value]) => (
            <div className="env-item" key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="panel">
        <h2>Interactive check</h2>
        <div className="ping-row">
          <button type="button" onClick={logPing}>
            Log a ping
          </button>
          <span className="ping-count">
            pings: <b>{pings.length}</b>
          </span>
        </div>
        <ul className="log">
          {pings.length === 0 && (
            <li className="log-empty">No pings yet — click the button above.</li>
          )}
          {pings.map((p) => (
            <li key={p.n}>
              <span className="n">#{p.n}</span>
              <span>{p.t} — state updated, component re-rendered</span>
            </li>
          ))}
        </ul>
      </div>

      <RoutingPanel />

      <footer>
        A real React app built with Vite and React Router — package.json,
        npm dependencies, a build step, and client-side routing all run
        before this page exists. Click Home / About / Status above to move
        between routes without a full page reload.
      </footer>
    </>
  );
}
