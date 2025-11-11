import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Rankings from './pages/Rankings';
import Products from './pages/Products';
import Resources from './pages/Resources';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TestAPI from './pages/TestAPI';
import Profile from './pages/Profile';
import AQIAnalysis from './pages/AQIAnalysis';
import CountryDetail from './pages/CountryDetail';
import SetAlert from './pages/SetAlert';
import './App.css';

// Smooth scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Layout wrapper with persistent Navbar
function Layout({ children }) {
  const location = useLocation();
  const [currentCountry, setCurrentCountry] = useState('IN');
  
  // Hide navbar on login/signup pages
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && (
        <Navbar 
          currentCountry={currentCountry} 
          onCountryChange={setCurrentCountry}
        />
      )}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/products" element={<Products />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/aqi-analysis" element={<AQIAnalysis />} />
            <Route path="/country/:countryCode" element={<CountryDetail />} />
            <Route path="/set-alert" element={<SetAlert />} />
            <Route path="/test-api" element={<TestAPI />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
