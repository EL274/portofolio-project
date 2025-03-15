import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FinanceContext } from '../context/FinanceContext';

const SettingsContainer = styled.div`
  max-width: 400px;
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

const CategoryContainer = styled.div`
  text-align: left;
  margin-top: 20px;
`;

const CategoryLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-top: 10px;
`;

const Settings = () => { 
  const { salary, setSalary, budget, setBudget, categoryBudgets, setCategoryBudgets } = useContext(FinanceContext);
  const [newSalary, setNewSalary] = useState(salary);
  const [newBudget, setNewBudget] = useState(budget);

  // Gérer la mise à jour des budgets par catégorie
  const handleCategoryChange = (category, value) => {
    setCategoryBudgets({ ...categoryBudgets, [category]: Number(value) });
  };

  const handleSave = async () => {
    const success = await updateBudget({ totalBudget: newBudget, salary: newSalary });
    if (success) {
        setSalary(newSalary);
        setBudget(newBudget);
        alert("Paramètres mis à jour !");
    } else {
        alert("Erreur lors de la mise à jour du budget.");
    }
};


  return (
    <SettingsContainer>
      <h2>Paramètres</h2>
      <p>Définissez votre salaire et votre budget mensuel.</p>

      {/* SALAIRE MENSUEL */}
      <Input
        type="number"
        placeholder="Salaire Mensuel (€)"
        value={newSalary}
        onChange={(e) => setNewSalary(Number(e.target.value))}
      />

      {/* BUDGET GLOBAL */}
      <Input
        type="number"
        placeholder="Budget mensuel (€)"
        value={newBudget}
        onChange={(e) => setNewBudget(Number(e.target.value))}
      />

      {/* BUDGET PAR CATÉGORIE */}
      <CategoryContainer>
        <h3>Répartir le budget par catégorie</h3>
        {["Alimentation", "Transport", "Logement", "Divertissement", "Santé"].map((category) => (
          <div key={category}>
            <CategoryLabel>{category}</CategoryLabel>
            <Input
              type="number"
              placeholder={`Budget pour ${category}`}
              value={categoryBudgets[category] || ""}
              onChange={(e) => handleCategoryChange(category, e.target.value)}
            />
          </div>
        ))}
      </CategoryContainer>

      <Button onClick={handleSave}>Enregistrer</Button>
    </SettingsContainer>
  );
};

export default Settings;
