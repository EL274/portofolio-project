import axios from 'axios';

export const API_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

// Vos fonctions API existantes (non modifiées)
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Erreur de connexion:", error);
        throw error;
    }
};

export const getUserData = async () => {
    try {
        const response = await api.get("/auth/user");
        return response.data;
    } catch (error) {
        console.error("Erreur de récupération utilisateur:",{
        message: error.message,
        status: error.responses?.status,
        data: error.response?.data,
        });
        throw error;
    }
};

export const getTransactions = async () => {
    try {
        const response = await api.get("/transactions");
        return response.data.map(t =>({
            ...t,
            id: t._id
          }));
    } catch (error) {
        console.error("Erreur lors de la récupération des transactions :", error);
        throw error;
    }
};

// Suppression d'une transaction
export const deleteTransaction = async (id) => {
    try {
        await api.delete(`/transactions/${id}`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la transaction:", error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("Erreur d'enregistrement:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Error lors de la déconnexion :", error);
        throw error;
    }

};

export default api;
