import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background: url('/assets/background-video.mp4') center/cover no-repeat;
  color: white;
  flex-direction: column;
`;

const Button = styled(Link)`
  margin-top: 20px;
  padding: 15px 30px;
  background: #007BFF;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>Bienvenue sur FinEase</h1>
      <p>Gérez votre budget et suivez vos finances facilement.</p>
      <Button to="/register">Commencer</Button>
    </HomeContainer>
  );
};

export default Home;
