import React from 'react';
import {Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/depenses">Dépenses</Link>
            <Link to="/users">Users</Link>
        </nav>
    );
};

export default Navbar;
