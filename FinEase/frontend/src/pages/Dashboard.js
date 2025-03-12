import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [depenses, setDepenses] = useState([]);

  useEffect(() => {
    const fetchDepenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/depenses', {
          headers: { 'x-auth-token': token },
        });
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
