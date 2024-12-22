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

  const checkDemo = () => {
    const demoStatus = localStorage.getItem('isDemo') === 'true';
    return demoStatus;
  }

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
    localStorage.removeItem('demoUser');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isDemo, // Include isDemo in the context value
        activateDemo,
        deactivateDemo,
        checkDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);