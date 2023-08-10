import React, { createContext, useContext, useState } from "react";

const AuthenticationContext = createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("jwt"));

  const login = (token) => {
    localStorage.setItem("jwt", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
