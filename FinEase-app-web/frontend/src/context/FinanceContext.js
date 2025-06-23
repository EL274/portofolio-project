import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [salary, setSalary] = useState(0);
  const [categoryBudgets, setCategoryBudgets] = useState({});

  // Nouvelle fonction pour éviter les doublons
  const addTransactions = (newTransactions) => {
    setTransactions(prev => {
      // Filtre les transactions sans ID et supprime les doublons
      const uniqueTransactions = [];
      const ids = new Set();

      [...prev, ...newTransactions].forEach(t => {
        const id = t.id || t._id;
        if (id && !ids.has(id)) {
          ids.add(id);
          uniqueTransactions.push(t);
        }
      });

      return uniqueTransactions;
    });
  };

  // Vérification du budget (votre code original inchangé)
  useEffect(() => {
    const totalDepenses = transactions
      .filter(t => t.type === 'dépense')
      .reduce((acc, t) => acc + t.amount, 0);

    if (budget > 0 && totalDepenses > budget) {
      toast.error(`⚠️ Dépassement de budget global de ${totalDepenses - budget} €`);
    }
  }, [transactions, budget]);

  // Vérification des budgets par catégorie (votre code original inchangé)
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
      transactions,
      setTransactions: addTransactions, // On utilise maintenant addTransactions
      budget, 
      setBudget, 
      salary, 
      setSalary,
      categoryBudgets, 
      setCategoryBudgets 
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
