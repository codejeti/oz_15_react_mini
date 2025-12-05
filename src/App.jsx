
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import MovieRequestForm from './pages/MovieRequestForm';
import DarkModeToggle from './components/DarkModeToggle';

const App = () => {
  return (
    <Router>
    <div className="bg-gray-900 min-h-screen text-white font-sans">
    <DarkModeToggle />

    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/:id" element={<Detail />} />
    <Route path="/request" element={<MovieRequestForm />} />
    </Routes>
    </div>
    </Router>
  );
};

export default App;
