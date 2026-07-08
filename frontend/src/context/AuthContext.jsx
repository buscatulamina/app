import React, { createContext, useContext, useState, useCallback } from 'react';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_TOKEN_VALUE = 'zegers_authenticated';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY) === AUTH_TOKEN_VALUE;
  });

  const login = useCallback((username, password) => {
    if (username === 'zegers' && password === 'canito') {
      localStorage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN_VALUE);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
