import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css'
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import MovieRequestForm from "./pages/MovieRequestForm";

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="bg-gray-900 min-h-screen text-white">
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/:id" element={<MovieDetail />} />
    <Route path="/request" element={<MovieRequestForm />} />
    </Routes>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
