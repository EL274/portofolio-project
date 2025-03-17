import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0); // Nouveau : Gestion du budget
  const [salary, setSalary] = useState(0); // Stocker le salaire de l'utilisateur
  const [categoryBudgets, setCategoryBudgets] = useState({}); // Budgets par catégorie

  // Vérifier si les dépenses dépassent le budget
  useEffect(() => {
    const totalDepenses = transactions
      .filter(t => t.type === 'dépense')
      .reduce((acc, t) => acc + t.amount, 0);

    if (budget > 0 && totalDepenses > budget) {
      toast.error(`⚠️ Dépassement de budget global de ${totalDepenses - budget} €`);
    }
  }, [transactions, budget]);

  useEffect(() => {
    transactions.forEach((t) => {
      if (categoryBudgets[t.category] && t.type === 'dépense') {
        const totalDepenseCategory = transactions
          .filter(trans => trans.category === t.category && trans.type === 'dépense')
          .reduce((acc, trans) => acc + trans.amount, 0);

        if (totalDepenseCategory > categoryBudgets[t.category]) {
          toast.warn(`⚠️ Dépassement du budget pour ${t.category} : ${totalDepenseCategory} €`);
        }
      }
    });
  }, [transactions, categoryBudgets]);

  return (
    <FinanceContext.Provider value={{ 
        transactions, setTransactions, budget, setBudget, salary, setSalary,categoryBudgets, setCategoryBudgets }}>
      {children}
    </FinanceContext.Provider>
  );
};
