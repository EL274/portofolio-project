import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
background= rgba(0, 0, 0 , 0.8);
color: black;
padding: 20px;
text-align: center;
position: fixed;
bottom:50px;
width: 100%;
`;

const FooterLink =  styled(Link)`
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
            <FooterLink to="/about">A propos</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/legal">Mentions Légales</FooterLink>
            <FooterLink to="/Home">Accueil</FooterLink>
            <FooterLink to="/Login">Inscription</FooterLink>
            </FooterLinks>
            <p>© {new Date().getFullYear()} FinEase - Tous droits réservés.</p>
        </FooterContainer>
    );
};

export default Footer;
