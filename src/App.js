import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Filme from './pages/Filme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/filme" element={<Filme />} />
      </Routes>
    </Router>
  );
}
export default App;
