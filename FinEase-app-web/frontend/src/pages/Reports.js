import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FinanceContext } from '../context/FinanceContext';
import { Line, Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';

const ReportsContainer = styled(motion.div)`
  padding: 30px;
  text-align: center;
`;

const ChartWrapper = styled.div`
  max-width: 600px;
  margin: 20px auto;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Reports = () => {
  const { transactions } = useContext(FinanceContext);
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    if (selectedMonth || selectedYear) {
      setFilteredTransactions(transactions.filter(t => {
        const date = new Date(t.date);
        return (
          (selectedMonth ? date.getMonth() + 1 === parseInt(selectedMonth) : true) &&
          (selectedYear ? date.getFullYear() === parseInt(selectedYear) : true)
        );
      }));
    } else {
      setFilteredTransactions(transactions);
    }
  }, [selectedMonth, selectedYear, transactions]);

  const revenues = filteredTransactions.filter(t => t.type === 'revenu').reduce((acc, t) => acc + t.amount, 0);
  const expenses = filteredTransactions.filter(t => t.type === 'dépense').reduce((acc, t) => acc + t.amount, 0);

  const lineChartData = {
    labels: filteredTransactions.map(t => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Revenus (€)',
        data: filteredTransactions.filter(t => t.type === 'revenu').map(t => t.amount),
        borderColor: 'green',
        fill: false,
      },
      {
        label: 'Dépenses (€)',
        data: filteredTransactions.filter(t => t.type === 'dépense').map(t => t.amount),
        borderColor: 'red',
        fill: false,
      }
    ]
  };

  const categoryTotals = filteredTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const doughnutChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Répartition des Dépenses',
        data: Object.values(categoryTotals),
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FFD700'],
      }
    ]
  };

  return (
    <ReportsContainer 
      initial={{ opacity: 0, x: -50 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 50 }} 
      transition={{ duration: 0.5 }}
    >
      <h1>Statistiques Avancées</h1>

      <FilterContainer>
        <Select onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">Tous les mois</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('fr-FR', { month: 'long' })}</option>
          ))}
        </Select>

        <Select onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Toutes les années</option>
          {Array.from(new Set(transactions.map(t => new Date(t.date).getFullYear()))).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Select>
      </FilterContainer>

      <ChartWrapper>
        <h2>Évolution des Revenus et Dépenses</h2>
        <Line data={lineChartData} />
      </ChartWrapper>

      <ChartWrapper>
        <h2>Répartition des Dépenses</h2>
        <Doughnut data={doughnutChartData} />
      </ChartWrapper>
    </ReportsContainer>
  );
};

export default Reports;
