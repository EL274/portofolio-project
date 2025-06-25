import axios from 'axios';

export const API_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json",
        "Cache-Control":  "no-cache",
        "Pragma": "no-cache"
     }
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
        status: error.response?.status,
        data: error.response?.data,
        });
        throw error;
    }
};

export const getTransactions = async () => {
    try {
        const response = await api.get("/transactions");
        const data = response.data;

        if (!data || typeof data !==  'object') {
            console.error("Format de réponse inattendu", data);
            return [];
        }

        const transactionsData = data.transactions || [];

        if (!Array.isArray(transactionsData)) {
            console.error("Erreur: la réponse des transactions n'est pas un tableau", transactionsData);
            return [];
        }

        return transactionsData.map(t => {
            if (!t._id) {
                console.warn("Transaction sans ID détectée", t);
                return {
                    ...t,
                    id: `temp-${crypto.randomUUID()}`
                };
            }
            return {
                ...t,
                id: t._id.toString(),
                _id: undefined
            };
          });
    } catch (error) {
        console.error("Erreur API détaillée:", {
           url: error.config?.url,
           status: error.response?.status,
           data: error.response?.data,
        });

        return []; 
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

export const updateBudget = async (budgetData) => {
    try {
        const response = await api.put("/budgets", budgetData);
        return response.data;
    } catch(error) {
        console.error("Error lors de la mise à jour du budget :", error);
        throw error;
    }
};

export const getBudget = async() => {
    try {
        const response = await api.get('/budgets');
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération budget:", error);
        throw error;
    }
};

export const updateBudgetCategory = async (categoryData) => {
    try {
        const response = await api.put("/budgets/category", categoryData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);

         throw error;
    }
}

export default api;
