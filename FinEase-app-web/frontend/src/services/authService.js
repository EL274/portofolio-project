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
