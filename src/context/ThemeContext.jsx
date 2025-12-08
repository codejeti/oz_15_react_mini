import { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // ✅ 밝기 상태 추가 (0.7 ~ 1.3 추천)
  const [brightness, setBrightness] = useState(() => {
    return Number(localStorage.getItem("brightness")) || 1;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("brightness", brightness);
  }, [brightness]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, brightness, setBrightness }}>
    {/* ✅ 전체 화면에 밝기 필터 적용 */}
    <div
    className={darkMode ? "dark" : ""}
    style={{
      filter: darkMode ? "none" : `brightness(${brightness})`,
    }}
    >
    {children}
    </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
