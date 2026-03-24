"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAuth(!!token);
  }, []);

  const loginContext = async () => {
    setAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, loginContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
