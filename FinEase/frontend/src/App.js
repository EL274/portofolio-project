import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DepensesPage from './pages/DepensesPage';
import UsersPage from './pages/UsersPage';
import CategoriesPage from './pages/Categories'; 
import ConseilsPage from './pages/Conseils';
import ObjectifsPage from './pages/Objectifs';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';

function App() {
  return (
    <Router>
      <Header/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/depenses" element={<DepensesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/conseils" element={<ConseilsPage />} />
            <Route path="/objectifs" element={<ObjectifsPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
    </Router>
  );
}

export default App;
