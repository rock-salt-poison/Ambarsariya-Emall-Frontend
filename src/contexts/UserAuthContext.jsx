import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
export const UserAuthContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('access_token'));

  // Update user state if localStorage value changes
  const updateUser = (newValue) => {
    setUser(newValue);
    localStorage.setItem('access_token', newValue);
  };

  // Fetch initial user value from localStorage
  useEffect(() => {
    setUser(localStorage.getItem('access_token'));
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, updateUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};
