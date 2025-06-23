import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FinanceContext } from '../context/FinanceContext';
import { addTransaction } from '../services/transactionService';
import { motion } from 'framer-motion';

const FormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const AddTransactionForm = () => {
  const { setTransactions } = useContext(FinanceContext);
  const [type, setType] = useState('revenu');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount || !date) return alert("Tous les champs sont obligatoires");

    const newTransaction = { type, category, amount: parseFloat(amount), date };
    try {
      const addedTransaction = await addTransaction(newTransaction);
      setTransactions([addedTransaction]);
      setCategory('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error("Erreur lors de l'ajout de la transaction:", error);
      alert("Erreur lors de l'ajout de la transaction");
    }
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3>Ajouter une transaction</h3>
      <form onSubmit={handleSubmit}>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="revenu">Revenu</option>
          <option value="dépense">Dépense</option>
        </Select>
        <Input type="text" placeholder="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} />
        <Input type="number" placeholder="Montant (€)" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button type="submit">Ajouter</Button>
      </form>
    </FormContainer>
  );
};

export default AddTransactionForm;

