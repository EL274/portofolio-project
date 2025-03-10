import React from 'react';
import { Link, Navigate } from 'react-router-dom'; // Pour la navigation
import './Header.css'; // Fichier CSS pour les styles du header
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Gère l'état de connexion
  const navigate = useNavigate();
  const handleLogout  = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  
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
          {isLoggedIn? (
            <li className="nav-item">
                <Link to ="/profil" className="nav-link">Profil</Link>
                </li>
          ):(
    
          <li className="nav-item">
            <Link to="/connexion" className="nav-link">Connexion</Link>
          </li>
          )}
        </ul>
      </nav>
      {/* Bouton de déconnexion */}
      {isLoggedIn && (
      <button onClick={handleLogout} className="logout-button">
        Déconnexion
      </button>
      )}
    </header>
  );
};

export default Header;
