import React, { useState,lazy, Suspense } from 'react';
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
import Inscription from './pages/Auth/Inscription/Inscription';
import Connexion from './pages/Auth/Connexion/Connexion';
import { AuthProvider } from './contexts/AuthContext';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';


import './App.scss';

// Composant de chat chargé de manière paresseuse
const LazyChat = lazy(() => import('./components/Chat/Chat'));

function App() {
  const [city, setCity] = useState('Paris');
  const [theme, setTheme] = useState('light');

  const handleSearch = async (term) => {
    setCity(term);
  };

  console.warn(theme);
  return (
    <AuthProvider>
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
                          <MarketStack title={`MarketStack`} />
                          <ExchangeRateStack title={`ExchangeRateStack`} />
                        </div>
                      </>
                    )}
                  </div>
                </>
              } />
              <Route path="/about" element={<About />} />
               {/* Route pour le chat */}
               <Route path="/chat" element={
                <Suspense fallback={<div>Loading Chat...</div>}>
                  <LazyChat />
                </Suspense>
              } />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Inscription" element={<Inscription />} />
              <Route path="/Connexion" element={<Connexion />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route path="*" element={<h1>404</h1>} />
            </Routes>
            <UnsplashImages searchTerm={city} />
            <ChatbotComponent />
            <Footer />
          </div>
        </Router>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}

export default App;
