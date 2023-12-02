import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/giphy.gif';

import './NavBar.scss';

function NavBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="nav-l">
        <Link to="/"> 
          <div className="logo">
            {/* <div className='frame'>
              <iframe
                allow="fullscreen"
                frameBorder="0"
                src="https://giphy.com/embed/SgUUMhQXsgklZJynyN/video"
                title="Giphy Video"
              ></iframe>
            </div> */}
            <img src={Logo} alt="MultiAPI Logo" /> 
          </div>
        </Link>  
        <div className="nav-logo">MultiAPI</div>
      </div>

      <div className="nav-r">
        <div className="links">
          <Link to="/">Accueil</Link>
          <Link to="/about">A propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="search">
            <input
              type="text"
              placeholder="Rechercher une ville..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button onClick={handleSearch}>Recherche</button>
          </div>
        </div>
    </nav>
  );
}

export default NavBar;
