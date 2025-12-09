import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { darkMode, setDarkMode } = useTheme();
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const storedProfile = localStorage.getItem("user_profile");

        if (token && storedProfile) {
            setUserProfile(JSON.parse(storedProfile));
        } else {
            setUserProfile(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_profile");
        alert("로그아웃 되었습니다.");
        navigate("/");
        window.location.reload();
    };

    return (
        <nav
        className="
        fixed top-0 left-0 z-50 w-full
        px-6 py-4 flex items-center justify-between
        bg-white text-black
        dark:bg-gray-900 dark:text-white
        border-b border-gray-200 dark:border-gray-700
        transition-colors duration-300
        "
        >
        {/* 로고 */}
        <Link to="/" className="text-2xl font-bold">
        🎬 Movie Explorer
        </Link>

        {/* 메뉴 */}
        <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-yellow-500 transition">
        홈
        </Link>
        <Link to="/request" className="hover:text-yellow-500 transition">
        영화 요청
        </Link>


        {userProfile ? (
            <div className="flex items-center gap-4">
            <span className="text-sm text-yellow-400">
            {userProfile.user_metadata?.name || userProfile.email}
            </span>
            <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-500"
            >
            로그아웃
            </button>
            </div>
        ) : (
            <div className="flex items-center gap-4">
            <button
            onClick={() => navigate("/login")}
            className="hover:text-yellow-500 transition"
            >
            로그인
            </button>
            <button
            onClick={() => navigate("/signup")}
            className="hover:text-yellow-500 transition"
            >
            회원가입
            </button>
            </div>
        )}

        {/* 다크모드 토글 */}
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
