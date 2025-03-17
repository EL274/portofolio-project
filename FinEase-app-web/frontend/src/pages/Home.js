import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 80px 20px 60px;
  text-align: center;
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>Bienvenue sur FinEase</h1>
      <p>Gérez vos finances facilement.</p>
    </HomeContainer>
  );
};

export default Home;
