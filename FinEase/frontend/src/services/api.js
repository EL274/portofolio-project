import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'x-auth-token': localStorage.getItem('token'),
  },
});
// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        // Rediriger vers la page de connexion si le token est invalide
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

export default api;
