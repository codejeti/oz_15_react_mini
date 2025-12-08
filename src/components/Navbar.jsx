import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { darkMode, setDarkMode } = useTheme();

    return (
        <nav className="
        fixed top-0 left-0 z-50 w-full
        px-6 py-4 flex items-center justify-between
        bg-white text-black
        dark:bg-gray-900 dark:text-white
        border-b border-gray-200 dark:border-gray-700
        transition-colors duration-300
        ">
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold">
        🎬 Movie Explorer
        </Link>

        {/* 메뉴 */}
        <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-yellow-500 transition">홈</Link>
        <Link to="/request" className="hover:text-yellow-500 transition">영화 요청</Link>

        <button
        onClick={() => setDarkMode(!darkMode)}
        className="
        px-4 py-2 rounded-lg
        bg-gray-200 text-black
        dark:bg-gray-700 dark:text-white
        transition-colors
        "
        >
        {darkMode ? "☀ 라이트" : "🌙 다크"}
        </button>
        </div>
        </nav>
    );
};

export default Navbar;
