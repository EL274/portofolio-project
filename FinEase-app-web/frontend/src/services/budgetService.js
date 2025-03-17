import axios from 'axios';

const API_URL = 'http://localhost:5000/api/budgets';

// Récupérer les budgets de l'utilisateur
export const getBudgets = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des budgets :", error);
    return [];
  }
};

// Mettre à jour le budget global
export const updateBudget = async (budget) => {
  try {
    const response = await axios.put(API_URL, { budget }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du budget :", error);
    return null;
  }
};

// Mettre à jour les budgets par catégorie
export const updateCategoryBudgets = async (categoryBudgets) => {
  try {
    const response = await axios.put(`${API_URL}/categories`, { categoryBudgets }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des budgets par catégorie :", error);
    return null;
  }
};
