import React, { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [appLoadedAt] = useState(() => new Date());
  const [statusVisits, setStatusVisits] = useState(0);

  function recordStatusVisit() {
    setStatusVisits((n) => n + 1);
  }

  return (
    <AppContext.Provider value={{ appLoadedAt, statusVisits, recordStatusVisit }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
