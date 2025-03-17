import axios from 'axios';

export const API_URL = "http://localhost:5000/api"; // Change cette URL si nécessaire

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Permet d'envoyer les cookies JWT
    headers: { "Content-Type": "application/json" }
});

/** 🔹 AUTHENTIFICATION **/
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error.response?.data || error.message);
        return null;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error.response?.data || error.message);
        return null;
    }
};

export const logoutUser = async () => {
    try {
        await api.post("/auth/logout");
        localStorage.removeItem("user");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error.response?.data || error.message);
    }
};

/** 🔹 BUDGET **/
export const getBudget = async () => {
    try {
        const response = await api.get("/budgets");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du budget :", error.response?.data || error.message);
        return null;
    }
};

export const updateBudget = async (budget) => {
    try {
        const response = await api.put("/budgets", budget);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du budget :", error.response?.data || error.message);
        return null;
    }
};

/** 🔹 TRANSACTIONS **/
export const getTransactions = async () => {
    try {
        const response = await api.get("/transactions");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des transactions :", error.response?.data || error.message);
        return [];
    }
};

export const addTransaction = async (transaction) => {
    try {
        const response = await api.post("/transactions", transaction);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de l'ajout de la transaction :", error.response?.data || error.message);
        return null;
    }
};

export const deleteTransaction = async (id) => {
    try {
        await api.delete(`/transactions/${id}`);
    } catch (error) {
        console.error("Erreur lors de la suppression de la transaction :", error.response?.data || error.message);
    }
};

/** 🔹 NOTIFICATIONS **/
export const getNotifications = async () => {
    try {
        const response = await api.get("/notifications");
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des notifications :", error.response?.data || error.message);
        return [];
    }
};

export default api;
