import React, { createContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, registerUser, getUserData } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const userData = await getUserData();
      if (!userData) {
        throw new Error("Aucune donnée utilisateur reçue");
      }
      
      setUser(userData);
    } catch (error) {
      console.error("Erreur d'authentification :", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    console.error("Erreur d'authentification:", {
      message: error.message,
      response: error.response?.data
    });
    setError(error.response?.data?.message || error.message);
    setUser(null);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await loginUser(email, password);
      setUser(data.user);
      setError(null);
      return data.user;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const data = await registerUser(userData);
      setUser(data.user);
      setError(null);
      return data.user;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error.message);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = { 
    user, 
    loading, 
    error,
    login, 
    register, 
    logout, 
    fetchUser 
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
          <p>Chargement en cours...</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
