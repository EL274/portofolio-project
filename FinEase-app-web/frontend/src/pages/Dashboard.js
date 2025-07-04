import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FinanceContext } from '../context/FinanceContext';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { motion } from 'framer-motion';
import { getTransactions } from '../services/api';

const DashboardContainer = styled(motion.div)`
  padding: 30px;
  text-align: center;
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const Card = styled(motion.div)`
  background: ${(props) => props.color || "#007BFF"};
  color: white;
  padding: 20px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const TransactionsLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #ffcc00;
  color: black;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background: #e6b800;
  }
`;

const BudgetAlert = styled.p`
  color: red;
  font-weight: bold;
`;

const EmptyMessage = styled.p`
  color: #666;
  font-style: italic;
  margin: 20px 0;
`;

// Déclaration de chartOptions (ajouté)
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${context.raw} €`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return `${value} €`;
        }
      }
    }
  }
};

const Dashboard = () => {
  const { transactions, setTransactions, budget } = useContext(FinanceContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Montant (€)',
      data: [],
      backgroundColor: '#ffcc00',
    }]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsData = await getTransactions();
        
        if (!Array.isArray(transactionsData)) {
          console.error("Les données reçues ne sont pas un tableau:", transactionsData);
          setTransactions([]);
          return;
        }

        setTransactions(transactionsData);

        if (transactionsData.length > 0) {
          const categories = transactionsData.map((t) => t.category);
          const amounts = transactionsData.map((t) => t.amount);

          setChartData({
            labels: categories,
            datasets: [{
              label: 'Montant (€)',
              data: amounts,
              backgroundColor: '#ffcc00',
            }]
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des transactions:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [setTransactions]);

  const totalRevenus = transactions
    .filter(t => t.type === 'revenu')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalDepenses = transactions
    .filter(t => t.type === 'dépense')
    .reduce((acc, t) => acc + t.amount, 0);
  const solde = totalRevenus - totalDepenses;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
    >
      <DashboardContainer>
        <h1>Tableau de Bord</h1>

        {budget > 0 && totalDepenses > budget && (
          <BudgetAlert>
            ⚠️ Vous avez dépassé votre budget mensuel de {totalDepenses - budget} €
          </BudgetAlert>
        )}

        <Summary>
          <Card 
            color="#28a745" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <h3>Solde Actuel</h3>
            <p>{solde.toFixed(2)} €</p>
          </Card>

          <Card 
            color="#007BFF" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.7 }}
          >
            <h3>Revenus</h3>
            <p>{totalRevenus.toFixed(2)} €</p>
          </Card>

          <Card 
            color="#dc3545" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.9 }}
          >
            <h3>Dépenses</h3>
            <p>{totalDepenses.toFixed(2)} €</p>
          </Card>
        </Summary>

        <h2>Répartition des Dépenses</h2>

        {!loading && transactions.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Bar data={chartData} options={chartOptions} />
          </motion.div>
        ) : (
          <EmptyMessage>
            {loading ? 'Chargement des données...' : 'Aucune transaction à afficher'}
          </EmptyMessage>
        )}

        <TransactionsLink to="/transactions">
          Voir toutes les transactions
        </TransactionsLink>
      </DashboardContainer>
    </motion.div>
  );
};

export default Dashboard;
