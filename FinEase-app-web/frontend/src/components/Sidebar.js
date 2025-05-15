import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes } from "react-icons/fa";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: rgba(193, 168, 168, 0.9);
  color: white;
  position: fixed;
  left: ${(props) => (props.open ? "0" : "-250px")};
  top: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease-in-out;
  z-index: 100;
`;

const SidebarLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 15px;
  font-size: 18px;
  display: block;
  transition: 0.3s;
  &:hover {
    background: #ffcc00;
    color: black;
  }
`;

const ToggleButton = styled.div`
  position: fixed;
  top: 20px;
  left: ${(props) => (props.open ? "260px" : "20px")};
  font-size: 24px;
  cursor: pointer;
  color: white;
  z-index: 101;
  transition: left 0.3s ease-in-out;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToggleButton open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </ToggleButton>

      <SidebarContainer open={isOpen}>
        <h2>FinEase</h2>
        <SidebarLink to="/">🏠 Home</SidebarLink>
        <SidebarLink to="/register">📝 Inscription</SidebarLink>
        <SidebarLink to="/profile">👤 Profil</SidebarLink>
        <SidebarLink to="/categories">📂 Catégories</SidebarLink>
        <SidebarLink to="/dashboard">📊 Dashboard</SidebarLink>
        <SidebarLink to="/transactions">💰 Transactions</SidebarLink>
        <SidebarLink to="/budgets">📅 Budgets</SidebarLink>
        <SidebarLink to="/reports">📈 Rapports</SidebarLink>
        <SidebarLink to="/settings">⚙️ Paramètres</SidebarLink>
        <SidebarLink to="/logout">🚪 Déconnexion</SidebarLink>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
