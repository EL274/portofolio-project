import axios from 'axios';
import { getCategories, getDepenses } from  '../services/api';

const API_URL = 'http://localhost:5000/api'; 

export const getDepenses = async () => {
    const response = await axios.get(`${API_URL}/depenses`);
    return response.data;
};

export const createDepense = async (depenseData) => {
    const response = await axios.post(`${API_URL}/depenses`, depenseData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/Auth/Login`, credentials);
    return response.data; // Retourne les données de l'utilisateur ou un token 
};

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  };

  export const getObjectifs = async () => {
    const response = await axios.get(`${API_URL}/Objectifs`);
    return response.data;
  };

  export const getConseils = async (userId) => {
    try {
    const response = await axios.get(`${API_URL}/Conseils/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error lors de la récupération des conseils :", error);
    throw error;
  }
};

export const getCategories = async () => {
    const response = await axios.get(`${API_URL}/Categories`);
    return response.data;
  };
