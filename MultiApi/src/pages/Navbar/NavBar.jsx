import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/giphy.gif';
import { useAuth } from '../../contexts/AuthContext';

import './NavBar.scss';

function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, setIsAuthenticated,userName  } = useAuth();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
 
  const handleSearch = () => {
    onSearch(searchTerm);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); 
    
  };

  return (
    <nav className="navbar">
      <div className="nav-l">
        <Link to="/"> 
          <div className="logo">
            <img src={Logo} alt="MultiAPI Logo" /> 
          </div>
        </Link>  
        <div className="nav-logo">MultiAPI</div>
      </div>

      <div className="nav-r">
        <div className="links">
        {isAuthenticated && <span>Bonjour, {userName}!</span>}
          <Link to="/">Accueil</Link>
          <Link to="/about">A propos</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/chat">Chat</Link>
          {!isAuthenticated && <Link to="/inscription">Inscription</Link>}
          {!isAuthenticated && <Link to="/connexion">Connexion</Link>}
          {isAuthenticated && <button onClick={handleLogout}>Déconnexion</button>}
        </div>
        <div className="search">
            <input
              type="text"
              placeholder="Rechercher une ville..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Recherche</button>
          </div>
        </div>
    </nav>
  );
}

export default NavBar;
