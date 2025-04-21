import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {Home, Works, Services, Contact, About, Navbar} from "./views/Home.jsx";
import { AnimatePresence, motion } from 'framer-motion';
import './App.css'

// Wrap the routes with this component to enable animations
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                  >
                      <Home />
                  </motion.div>
              } />
              <Route path="/works" element={
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                  >
                      <Works />
                  </motion.div>
              } />
              <Route path="/contact" element={
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                  >
                      <Contact />
                  </motion.div>
              } />
          </Routes>
      </AnimatePresence>
  );
};

function App() {
  return (
      <Router>
          <Navbar />
          <div className="container-fluid mt-4">
              <AnimatedRoutes />
          </div>
      </Router>
  );
}

export default App;