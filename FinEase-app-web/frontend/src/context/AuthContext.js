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
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      localStorage.removeItem('user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Échec de connexion");
      }

      const { user: userData } = await response.json();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      console.error("Erreur:", error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const registeredUser = await registerUser(userData);
      setUser(registeredUser);
      localStorage.setItem('user', JSON.stringify(registeredUser));
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
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const value = { user, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
