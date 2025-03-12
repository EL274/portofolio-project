import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddDepense from './pages/AddDepense';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-depense" element={<AddDepense />} />
      <Route path="/" element={<Login />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
