import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.8); /* Correction */
  color: white;
  padding: 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const FooterLinks = styled.div`
  margin-bottom: 10px;
`;

const FooterLink = styled(Link)`
  color: yellow;
  text-decoration: none;
  margin: 10px;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink to="/about">À propos</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
        <FooterLink to="/legal">Mentions Légales</FooterLink>
        <FooterLink to="/home">Accueil</FooterLink>
        <FooterLink to="/login">Connexion</FooterLink>
      </FooterLinks>
      <p>© {new Date().getFullYear()} FinEase - Tous droits réservés.</p>
    </FooterContainer>
  );
};

export default Footer;
