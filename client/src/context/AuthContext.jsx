import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    // Check local storage or some persistent storage for auth status
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);

    const demoStatus = localStorage.getItem('isDemo') === 'true';
    setIsDemo(demoStatus);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  // Function to activate demo mode
  const activateDemo = () => {
    setIsDemo(true);
    localStorage.setItem('isDemo', 'true');
  };

  // Function to deactivate demo mode
  const deactivateDemo = () => {
    setIsDemo(false);
    localStorage.removeItem('isDemo');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);