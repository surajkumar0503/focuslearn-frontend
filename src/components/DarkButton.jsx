import { FaMoon, FaSun } from "react-icons/fa";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

function DarkModeButton({ isDarkMode, toggleDarkMode }) {
  const { colors } = useContext(DarkModeContext);
  return (
    <button
      onClick={toggleDarkMode}
      style={{
        cursor: "pointer",
        fontSize: "1.2rem",
        color: colors.text,
        background: "none",
        border: "none",
        padding: "0",
      }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default DarkModeButton;