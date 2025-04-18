import React, { createContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, registerUser, getUserData } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const userData = await getUserData();
      setUser(userData || null);
      if (userData) localStorage.setItem('isAuthenticated', 'true');
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      localStorage.removeItem('isAuthenticated');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
      });
      setUser(userData);
      localStorage.setItem('isAuthenticated', 'true');
      return userData;
    } catch (error) {
      console.error("Échec de la connexion :", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const registeredUser = await registerUser(userData);
      setUser(registeredUser);
      localStorage.setItem('isAuthenticated', 'true');
      return registeredUser;
    } catch (error) {
      console.error("Échec de l'inscription :", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem('isAuthenticated');
      setUser(null);
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) fetchUser();
    else setLoading(false);
  }, []);

  const value = { user, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
