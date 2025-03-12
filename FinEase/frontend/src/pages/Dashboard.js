import React, { useEffect, useState } from 'react';
import api from '../services/api'; // Importez l'instance centralisée

const Dashboard = () => {
  const [depenses, setDepenses] = useState([]);

  useEffect(() => {
    const fetchDepenses = async () => {
      try {
        const res = await api.get('/depenses'); // Utilisez l'instance centralisée
        setDepenses(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepenses();
  }, []);

  return (
    <div>
      <h1>Tableau de bord</h1>
      <ul>
        {depenses.map((depense) => (
          <li key={depense._id}>
            {depense.nom} - {depense.montant}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
