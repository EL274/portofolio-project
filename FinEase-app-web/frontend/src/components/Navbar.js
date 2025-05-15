import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import FineaseLogo from '../assets/Finease.png'; // Assurez-vous que cette image est bien dans `src/assets/`

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px;
  background: rgba(21, 4, 4, 0.8);
  backdrop-filter: blur(10px);
  position: fixed;
  width: %;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    padding: 20px 0;
    width: 100%;
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
  font-size: 24px;
  color: white;

  @media (max-width: 768px) {
    display: block;
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
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu lors du changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <NavbarContainer>
      <Link to="/">
        <Logo src={FineaseLogo} alt="FinEase Logo" />
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
          <Button onClick={() => logout && logout()}>Déconnexion</Button>
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
