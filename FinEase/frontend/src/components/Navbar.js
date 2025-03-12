import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav>
    <Link to="/">Accueil</Link>
    <Link to="/dashboard">Tableau de bord</Link>
    <Link to="/add-depense">Ajouter une dépense</Link>
    <Link to="/login">Connexion</Link>
    <Link to="/register">Inscription</Link>
    </nav>
);

export default Navbar;
