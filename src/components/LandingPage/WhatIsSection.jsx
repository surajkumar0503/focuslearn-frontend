import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { COLORS } from "../../utils/colors";

function WhatIsSection({ isDarkMode }) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };
  const parallax = {
    y: [0, -10, 0],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  };

  return (
    <motion.section
      className="what-is slide py-5 text-center"
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.h2 className="display-5 mb-4" variants={slideIn}>
          Get to Know FocusLearn
        </motion.h2>
        <motion.p
          className="lead mb-4"
          style={{ maxWidth: "900px", margin: "0 auto" }}
          variants={fadeIn}
        >
          FocusLearn is an AI- Powered distraction-free learning and note-taking tool designed to 
          enhance learning efficiency when dealing with online YouTube video and it includes an AI chat Assistant
          that allow to asks questions about particular YouTube video and receive deeper explanation. 
          FocusLearn is particularly useful for Students, professionals, and reasearchers.  
        </motion.p>
        <motion.p
          className="mb-4"
          style={{ maxWidth: "900px", margin: "0 auto", fontSize: "1rem" }}
          variants={fadeIn}
        >
          FocusLearn empowers you to capture and organize your learning effortlessly.
          Save video transcripts, create your personal richly formatted notes.
        </motion.p>
        <motion.div variants={fadeIn} whileHover={{ scale: 1.1 }} animate={parallax}>
          <i className="bi bi-journal-text fs-1" style={{ color: isDarkMode ? COLORS.primary : COLORS.secondary }}></i>
        </motion.div>
        <motion.a
          href="/notes"
          className="btn btn-primary btn-lg mt-3"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.textDark,
            border: "none",
          }}
          aria-label="Go to My Notes"
          whileHover={hoverScale}
          variants={fadeIn}
        >
          Take me to My Notes
        </motion.a>
      </div>
    </motion.section>
  );
}

export default WhatIsSection;