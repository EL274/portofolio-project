import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FinanceContext } from '../context/FinanceContext';
import { motion } from 'framer-motion';
import AddTransactionForm from '../components/AddTransactionForm';
import { exportCSV, exportPDF } from '../services/exportService'; // Correction du chemin
import { getTransactions, deleteTransaction } from '../services/api';
import Input from '../components/Input'; // Assurez-vous que ce fichier existe

const TransactionsContainer = styled.div`
  padding: 30px;
  text-align: center;
`;

const TransactionList = styled(motion.ul)`
  list-style: none;
  padding: 0;
`;

const TransactionItem = styled(motion.li)`
  background: ${(props) => (props.type === 'revenu' ? '#28a745' : '#dc3545')};
  color: white;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background: white;
  color: red;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const ExportButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Transactions = () => {
  const { transactions, setTransactions } = useContext(FinanceContext);
  const [filterCategory, setFilterCategory] = useState(''); // Déclaration de l'état
  const [filterDate, setFilterDate] = useState(''); // Déclaration de l'état

  // Récupérer les transactions au montage du composant
  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };

    fetchTransactions();
  }, [setTransactions]);

  // Supprimer une transaction
  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Filtrer les transactions
  const filteredTransactions = transactions.filter(
    (t) =>
      (filterCategory ? t.category.includes(filterCategory) : true) &&
      (filterDate ? t.date === filterDate : true)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <TransactionsContainer>
        <h1>Transactions</h1>

        {/* Boutons d'exportation */}
        <ExportButtons>
          <button onClick={() => exportCSV(filteredTransactions)}>Exporter en CSV</button>
          <button onClick={() => exportPDF(filteredTransactions)}>Exporter en PDF</button>
        </ExportButtons>

        {/* Formulaire d'ajout */}
        <AddTransactionForm />

        {/* Filtres */}
        <Input
          type="text"
          placeholder="Filtrer par catégorie"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        />
        <Input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        {/* Liste des transactions filtrées */}
        <TransactionList>
          {filteredTransactions.map((t) => (
            <TransactionItem
              key={t.id}
              type={t.type}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span>
                {t.category} - {t.amount} €
              </span>
              <DeleteButton onClick={() => handleDelete(t.id)}>X</DeleteButton>
            </TransactionItem>
          ))}
        </TransactionList>
      </TransactionsContainer>
    </motion.div>
  );
};

export default Transactions;
