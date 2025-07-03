import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import LoadingSpinner from './components/Common/LoadingSpinner';
import Home from './pages/Home';
import APOD from './pages/APOD';
import MarsRover from './pages/MarsRover';
import NEO from './pages/NEO';
import EPIC from './pages/EPIC';
import LoadingProvider from './context/LoadingContext';

function App() {
  return (
    <LoadingProvider>
      <Router>
        <div className="min-h-screen gradient-bg">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apod" element={<APOD />} />
              <Route path="/mars-rover" element={<MarsRover />} />
              <Route path="/neo" element={<NEO />} />
              <Route path="/epic" element={<EPIC />} />
            </Routes>
          </main>
          <LoadingSpinner />
        </div>
      </Router>
    </LoadingProvider>
  );
}

export default App;
