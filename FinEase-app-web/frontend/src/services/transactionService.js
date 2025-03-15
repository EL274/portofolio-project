import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

// Récupérer toutes les transactions
export const getTransactions = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des transactions :", error);
    return [];
  }
};

// Ajouter une nouvelle transaction
export const addTransaction = async (transaction) => {
  try {
    const response = await axios.post(API_URL, transaction, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la transaction :", error);
    return null;
  }
};

// Supprimer une transaction
export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
  } catch (error) {
    console.error("Erreur lors de la suppression de la transaction :", error);
  }
};
