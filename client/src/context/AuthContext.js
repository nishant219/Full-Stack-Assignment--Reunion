import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};


const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(()=>{
    const storedUser = Cookies.get('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    //const storedUser = localStorage.getItem('user');
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // Parse the stringified user object
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    Cookies.set('user', JSON.stringify(userData), { expires: 3 }); 
    //localStorage.setItem('user', JSON.stringify(userData));
  };


  const logout = () => {
    // Example: Perform logout, clear user, and remove from localStorage
    setUser(null);
    Cookies.remove('user');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
  

export { AuthProvider, useAuth };
