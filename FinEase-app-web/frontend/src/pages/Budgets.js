import React, { useContext } from 'react';
import styled from 'styled-components';
import { FinanceContext } from '../context/FinanceContext';

const BudgetsContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Input = styled.input`
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

const Budgets = () => {
  const { categoryBudgets, setCategoryBudgets } = useContext(FinanceContext);

  const handleCategoryChange = (category, value) => {
    setCategoryBudgets({ ...categoryBudgets, [category]: Number(value) });
  };

  const handleSave = async () => {
    try {
      const formattedCategoryBudgets = Object.entries(categoryBudgets).map(([category, amount]) => ({
        category,
        amount,
      }));
      const budgetData = {
        totalBudget, 
        categoryBudgets: formattedCategoryBudgets
      };
      await updateBudget(budgetData);
      alert("✅ Budget enregistré avec succès !");
    } catch (error) {
      console.error("Erreur enregistrement budget :", error);
      alert("❌ Échec de l'enregistrement du budget.");
    }
  };

  return (
    <BudgetsContainer>
      <h2>Gérer vos Budgets</h2>
      <div>
        <label>Budget total</label>
        <Input
          type="number"
          placeholder="Ex:2000"
          value={totalBudget}
          onChange={(e) => setTotalBudget(Number(e.target.value))}
        />
      </div>
      {["Alimentation", "Transport", "Logement", "Divertissement", "Santé"].map((category) => (
        <div key={category}>
          <label>{category}</label>
          <Input type="number" placeholder={`Budget pour ${category}`} onChange={(e) => handleCategoryChange(category, e.target.value)} />
        </div>
      ))}
      <Button>Enregistrer</Button>
    </BudgetsContainer>
  );
};

export default Budgets;
