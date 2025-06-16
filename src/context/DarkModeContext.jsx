import React, { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
  colors: {
    background: "#FFFFFF",
    text: "#141619",
    secondaryBackground: "#2C2E3A",
    accent: "#050A44",
    primary: "#0A21C0",
  },
});

export function DarkModeProvider({ children }) {
  // state for dark mode toggle, initialized to false for light mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false; 
  });

  // color palette for dark and light modes
  const colors = isDarkMode
    ? {
        background: "#141619",
        text: "#FFFFFF",
        secondaryBackground: "#2C2E3A",
        accent: "#050A44",
        primary: "#0A21C0",
      }
    : {
        background: "#FFFFFF",
        text: "#141619",
        secondaryBackground: "#2C2E3A",
        accent: "#050A44",
        primary: "#0A21C0",
      };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light"); 
      return newMode;
    });
  };

  useEffect(() => {
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </DarkModeContext.Provider>
  );
}