import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importez l'instance centralisée

const AddDepense = () => {
  const [nom, setNom] = useState('');
  const [montant, setMontant] = useState('');
  const [categorie, setCategorie] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/depenses', { nom, montant, categorie }); // Utilisez l'instance centralisée
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
      <input type="number" placeholder="Montant" value={montant} onChange={(e) => setMontant(e.target.value)} required />
      <input type="text" placeholder="Catégorie" value={categorie} onChange={(e) => setCategorie(e.target.value)} required />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddDepense;
