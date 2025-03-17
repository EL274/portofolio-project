import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Si vous avez un logo dans le dossier public, utilisez process.env.PUBLIC_URL
// Sinon, si le logo se trouve dans src/assets, utilisez un import
const NavbarContainer = styled.nav`
  background: #007BFF;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <div>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px' }}>
          FinEase
        </Link>
      </div>
      <div>
        <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
          Dashboard
        </Link>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
