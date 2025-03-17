import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Connexion de l'utilisateur
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true });
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return null;
  }
};

// Inscription d'un utilisateur
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return null;
  }
};

// authService.js

export const updateProfile = async (data) => {
  try {
    // Récupérer le token d'authentification
    const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké ici

    // Envoyer une requête PUT à l'API pour mettre à jour le profil
    const response = await fetch('/api/profile/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Envoyer le token dans les en-têtes
      },
      body: JSON.stringify(data), // Les données du profil à mettre à jour
    });

    // Vérifier si la réponse est OK
    if (!response.ok) {
      const errorData = await response.json(); // Lire les détails de l'erreur
      throw new Error(errorData.message || 'Échec de la mise à jour du profil');
    }

    // Retourner les données mises à jour (si l'API les renvoie)
    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw error; // Propager l'erreur pour la gérer dans le composant
  }
};

// Récupérer les données utilisateur
export const getUserData = async () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur :", error);
    return null;
  }
};

// Déconnexion
export const logout = async () => {
  localStorage.removeItem('user');
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};
