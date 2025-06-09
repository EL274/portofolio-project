import axios from 'axios';

export const API_URL = "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur de réponse CORRIGÉ (version minimale fonctionnelle)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si erreur 401 ET ce n'est pas déjà une tentative de refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // 1. Essayez d'abord de rafraîchir le token
                const refreshResponse = await api.post("/auth/refresh");
                const newToken = refreshResponse.data.token;
                
                // 2. Mise à jour du token
                localStorage.setItem("token", newToken);
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                
                // 3. Retentez la requête originale
                return api(originalRequest);
                
            } catch (refreshError) {
                // Si le refresh échoue (erreur 404 ou autre)
                console.error("Échec du rafraîchissement:", refreshError);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        
        return Promise.reject(error);
    }
);

// Vos fonctions API existantes (non modifiées)
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
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

export default api;
