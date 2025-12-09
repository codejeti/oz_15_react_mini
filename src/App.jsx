import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import MovieRequestForm from "./pages/MovieRequestForm";
import Navbar from "./components/Navbar.jsx";
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">

    {/* ✅ 네비게이션 바 */}
    <Navbar />

    {/* ✅ 페이지 영역 */}
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/movie/:id" element={<MovieDetail />} />
    <Route path="/request" element={<MovieRequestForm />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    </Routes>

    </div>
  );
}

export default App;
