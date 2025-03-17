import React from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 80px 20px 60px;
  text-align: center;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <p>Voici un aperçu de vos finances.</p>
    </DashboardContainer>
  );
};

export default Dashboard;
