import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Status from "./pages/Status.jsx";

function navClass({ isActive }) {
  return isActive ? "active" : undefined;
}

export default function App() {
  return (
    <AppProvider>
      <main>
        <nav className="topnav">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/status" className={navClass}>
            Status
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/status" element={<Status />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </AppProvider>
  );
}

function NotFound() {
  return (
    <>
      <header>
        <span className="dot" aria-hidden="true" />
        <h1>Not found</h1>
      </header>
      <p className="status-text">No route matches this path.</p>
      <div className="panel">
        <p>
          There's no page at <code>{window.location.pathname}</code>. Try
          Home, About, or Status from the nav above.
        </p>
      </div>
    </>
  );
}
