import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

const LoginContainer = styled.div`
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

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await loginUser(email, password);
    if (user) {
      setUser(user);
      navigate('/dashboard');
    } else {
      alert("Échec de la connexion. Vérifiez vos informations.");
    }
  };

  return (
    <LoginContainer>
      <h2>Connexion</h2>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Se connecter</Button>
    </LoginContainer>
  );
};

export default Login;
