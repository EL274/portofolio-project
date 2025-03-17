import React, { createContext, useState, useEffect } from 'react';
import { loginUser, logout, registerUser, getUserData, updateProfile } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

  // Fonction pour récupérer les données de l'utilisateur
  const fetchUser = async () => {
    try {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error);
      setUser(null); // Réinitialiser l'utilisateur en cas d'erreur
    } finally {
      setLoading(false); // Arrêter le chargement une fois terminé
    }
  };

  // Fonction pour gérer la connexion
  const handleLogin = async (email, password) => {
    const userData = await loginUser(email, password);
    if (userData) {
      setUser(userData);
    }
  };

  // Fonction pour gérer l'inscription
  const handleRegister = async (userData) => {
    const registeredUser = await registerUser(userData);
    if (registeredUser) {
      setUser(registeredUser);
    }
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  // Fonction pour mettre à jour le profil
  const handleUpdateProfile = async (updatedData) => {
    const updatedUser = await updateProfile(updatedData);
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  // Effet pour récupérer les données de l'utilisateur au montage du composant
  useEffect(() => {
    fetchUser();
  }, []);

  // Valeurs fournies par le contexte
  const value = {
    user,
    loading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateProfile: handleUpdateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Ne rendre les enfants que lorsque le chargement est terminé */}
    </AuthContext.Provider>
  );
};
