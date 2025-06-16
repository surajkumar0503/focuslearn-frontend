import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { COLORS } from "../../utils/colors";

function HeroSection({ isDarkMode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };
  const pulse = {
    scale: [1, 1.05, 1],
    transition: { repeat: 3, duration: 1.5 },
  };

  return (
    <motion.section
      className="hero text-center py-5"
      style={{ backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container">
        <motion.h1 className="display-4 mb-4" variants={fadeIn}>
          Welcome to <span style={{ color: COLORS.danger }}>Focus</span>
          <span style={{ color: COLORS.primary }}>Learn</span>
        </motion.h1>
        <motion.p className="lead mb-4" variants={fadeIn}>
          AI Learning Assistant
        </motion.p>
        <motion.p
          className="mb-4"
          style={{ maxWidth: "800px", margin: "0 auto" }}
          variants={fadeIn}
        >
          Immerse yourself in YouTube videos without ads or distractions. Generate
          real-time transcripts, ask AI-powered questions, and organize your notes
          with rich Markdown formatting for a seamless learning experience.
        </motion.p>

        <div className="d-flex gap-3 justify-content-center">
          <motion.a
            href="/app"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.textDark,
              border: "none",
            }}
            aria-label="Start using FocusLearn"
            whileHover={hoverScale}
            animate={pulse}
            variants={fadeIn}
          >
            Get Started
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
}

export default HeroSection;