import React, { useState, useContext } from 'react'; // Ajout de `useContext`
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Logo = styled.img`
  width: 120px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')}; /* Correction */
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    padding: 20px 0;
  }
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: #ffd700;
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
    color: white;
  }
`;

const Button = styled.button`
  background: #ffcc00;
  color: black;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background: #e6b800;
  }
`;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Utilisation correcte du contexte
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <NavbarContainer>
      <Link to="/">
        <Logo src="/assets/Finease.png" alt="FinEase Logo" />
      </Link>

      <MenuIcon onClick={() => setMenuOpen(!menuOpen)}>☰</MenuIcon>

      <NavLinks open={menuOpen}>
        {user && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/transactions">Transactions</NavLink>
            <NavLink to="/budgets">Budgets</NavLink>
            <NavLink to="/profile">Mon Profil</NavLink>
          </>
        )}

        {user ? (
          <Button onClick={logout}>Déconnexion</Button>
        ) : (
          <NavLink to="/login">
            <Button>Connexion</Button>
          </NavLink>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
