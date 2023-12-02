import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './pages/Navbar/NavBar';
import Footer from './pages/Footer/Footer';
import Weather from './components/Weather/Weather';
import CityMap from './components/CityMap/CityMap'; // Assurez-vous que le chemin d'importation est correct
import UnsplashImages from './components/Unsplash/Unsplash';
import Population from './components/Population/Population';
import About from './pages/About/About'; 
import Contact from './pages/Contact/Contact'; 
import MarketStack from './components/MarketStack/MarketStack';
import ExchangeRateStack from './components/ExchangeRateStack/ExchangeRateStack';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';
import ThemeContext from './contexts/ThemeContext';
import ChatbotComponent from './components/ChatbotComponent/ChatbotComponent';

import './App.scss';

function App() {
  const [city, setCity] = useState('Paris');
  const [theme, setTheme] = useState('light')

  const handleSearch = async (term) => {
    setCity(term);
  };

  console.warn(theme)
  return (
    // Provider
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
    <Router>
      <div className="App">
        <NavBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={
            <>
              <Weather city={city} />
              <div className="content">
                {city && (
                  <>
                    <div className="c-col">
                      <Population title={`Population`} city={city} />
                      <CurrencyConverter />
                    </div>
                    <div className="c-col map">
                      <CityMap city={city} />
                    </div>
                    <div className="c-col">
                      <MarketStack title={`MarketStack`}  />
                      <ExchangeRateStack title={`ExchangeRateStack`}  />
                      
                    </div>  
                  </>
                )}
              </div>
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <UnsplashImages searchTerm={city} />
        <ChatbotComponent />
        <Footer />
      </div>
    </Router>
    </ThemeContext.Provider>
  );
}

export default App;
