import axios from 'axios';
import { response } from '../../../back-end/app';
const API_URL = 'http://localhost:5000/api'; 

export const getDepenses = async () => {
    const response = await axios.get(`${API_URL}/depenses`);
    return response.data;
};

export const createDepense = async (depenseData) => {
    const reponse = await axios.post(`${API_URL}/depenses`, depenseData);
    return response.data;
};
