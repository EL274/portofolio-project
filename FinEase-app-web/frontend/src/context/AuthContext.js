import React, { createContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, registerUser, getUserData } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupérer les données de l'utilisateur
  const fetchUser = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la connexion
  const login = async (email, password) => {
    const userData = await loginUser(email, password);
    if (userData) {
      setUser(userData);
    }
  };

  // Gérer l'inscription
  const register = async (userData) => {
    const registeredUser = await registerUser(userData);
    if (registeredUser) {
      setUser(registeredUser);
    }
  };

  // Gérer la déconnexion
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  // Effet pour récupérer les données de l'utilisateur au montage
  useEffect(() => {
    fetchUser();
  }, []);

  // Valeurs fournies par le contexte
  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
