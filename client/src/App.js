import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//pages
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PropertyListing from './pages/PropertyListing';
import CreateProperty from './pages/CreateProperty';
import Home from './pages/Home';
//components
import Footer from './components/Footer';
import Navbar from './components/Navbar';
//contexts
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-listing" element={<PropertyListing />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/create-property" element={<CreateProperty />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
