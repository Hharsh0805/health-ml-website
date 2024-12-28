// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import Features from './components/Features'; // Import Features component
// import HealthCarousel from './components/HealthCarousel'; // Import HealthCarousel component
import HealthInsights from './components/HealthInsights'; // Import HealthInsights component
import Hero from './components/Hero'; // Import Hero component
import './globals.css';
function App() {
  return (
    <Router>
      <Header /> {/* Header section */}
      <Routes>
        <Route path="/" element={
          <>
            <Hero /> {/* Hero section */}
            <HealthInsights /> {/* Health Insights section */}
            <Features /> {/* Features section */}
          </>
        } />
      </Routes>
      <Footer /> {/* Footer section */}
    </Router>
  );
}

export default App;
