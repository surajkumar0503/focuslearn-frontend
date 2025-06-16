import React, { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import HeroSection from "./HeroSection";
import WhatIsSection from "./WhatIsSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import { COLORS } from "../../utils/colors";
import "./LandingPage.css";

function LandingPage() {
  const { isDarkMode } = useContext(DarkModeContext) || { isDarkMode: false };

  return (
    <div
      className="landing-page-container"
      style={{
        backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight,
        color: isDarkMode ? COLORS.textDark : COLORS.textLight,
        minHeight: "100vh",
        padding: "1.5rem 0",
      }}
    >
      <HeroSection isDarkMode={isDarkMode} />
      <WhatIsSection isDarkMode={isDarkMode} />
      <FeaturesSection isDarkMode={isDarkMode} />
      <HowItWorksSection isDarkMode={isDarkMode} />
    </div>
  );
}

export default LandingPage;