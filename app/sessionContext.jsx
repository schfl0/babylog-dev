import { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ value, children }) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
