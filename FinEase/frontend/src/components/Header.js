import React from 'react';
import { Link } from 'react-router-dom'; // Pour la navigation
import './Header.css'; // Fichier CSS pour les styles du header

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Gère l'état de connexion
  const handlogout  = () => {
    setIsloggedin 
  }
  const logoUrl = `${process.env.PUBLIC_URL}/images/Finease.png`;
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img
          src={`${process.env.PUBLIC_URL}/images/Finease.png`}
          alt="Logo de l'application"
        />
      </div>

      {/* Titre de l'application */}
      <h1 className="app-title">FinEase</h1>

      {/* Menu de navigation */}
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link to="/depenses" className="nav-link">Dépenses</Link>
          </li>
          {isloggedIn? (
            <li className="nav-item">
                <link to ="/profil" className="nav-link">Profil</link>
                </li>
          ):(
    
          <li className="nav-item">
            <Link to="/connexion" className="nav-link">Connexion</Link>
          </li>
          )}
        </ul>
      </nav>
      {/*...*/}
      {isLoggedIn && (
      <button onClick={handleLogout} className="logout-button">
        Déconnexion
      </button>
      )}
    </header>
  );
};

export default Header;
