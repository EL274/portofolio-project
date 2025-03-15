import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FinanceContext } from '../context/FinanceContext';

const CategoriesContainer = styled.div`
  padding: 30px;
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
  background: #007BFF;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  background: #f4f4f4;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const Categories = () => {
  const { categories, setCategories } = useContext(FinanceContext);
  const [newCategory, setNewCategory] = useState('');

  const addCategory = () => {
    if (!newCategory.trim()) return;
    setCategories([...categories, newCategory]);
    setNewCategory('');
  };

  const removeCategory = (category) => {
    setCategories(categories.filter(cat => cat !== category));
  };

  return (
    <CategoriesContainer>
      <h1>Gérer les Catégories</h1>

      <Input 
        type="text" 
        placeholder="Nouvelle catégorie" 
        value={newCategory} 
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button onClick={addCategory}>Ajouter</Button>

      <CategoryList>
        {categories.map((cat) => (
          <CategoryItem key={cat}>
            <span>{cat}</span>
            <Button onClick={() => removeCategory(cat)}>X</Button>
          </CategoryItem>
        ))}
      </CategoryList>
    </CategoriesContainer>
  );
};

export default Categories;
