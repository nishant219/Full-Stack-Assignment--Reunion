import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PropertyListing from './pages/PropertyListing';
import Footer from './components/Footer';
import CreateProperty from './pages/CreateProperty';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Add your other routes here */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PropertyListing />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/create-property" element={<CreateProperty />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
