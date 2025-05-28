import React, { createContext, useState, useEffect } from 'react';
import { loginUser , logoutUser, registerUser, getUserData } from '../services/api';

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
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
  try {
    const data = await loginUser(email, password);
    if (!data?.user) {
      throw new Error("Utilisateur non trouvé");
    }
    
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user)); // Correction ici
    return data.user;
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
    } catch (error) {
      console.error("Erreur lors de la déconnexion : ", error);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = { user, loading, login, register, logout, fetchUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
