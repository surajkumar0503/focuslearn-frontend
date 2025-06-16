import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { COLORS } from "../../utils/colors";

function FeaturesSection({ isDarkMode }) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  const hoverScale = {
    scale: 1.05,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.3 },
  };

  const features = [
    {
      title: "Distraction-Free Playback",
      description: "Enjoy YouTube videos without ads, recommendations, or sidebars for focused learning.",
      icon: "bi-shield-check",
    },
    {
      title: "Smart AI Queries",
      description: "Ask questions about video content and get instant, accurate answers powered by AI.",
      icon: "bi-lightbulb",
    },
    {
      title: "Automated Transcripts",
      description: "Generate real-time transcripts and save them as notes for easy reference.",
      icon: "bi-file-text",
    },
    {
      title: "Rich Note Editing",
      description: "Create and edit notes with Markdown, including headers, lists, and code blocks.",
      icon: "bi-pencil-square",
    },
    {
      title: "Organized Note Storage",
      description: "Store and categorize notes linked to videos in a clean, accessible interface.",
      icon: "bi-folder",
    },
    {
      title: "Cross-Device Access",
      description: "Access your notes and learning progress on any device, anytime.",
      icon: "bi-phone",
    },
  ];

  return (
    <motion.section
      className="features py-5"
      style={{ backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight }}
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.h2
          className="text-center mb-5"
          style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}
          variants={cardVariants}
        >
          Features
        </motion.h2>
        <div className="row">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="col-12 col-md-12 col-lg-4 mb-4"
              variants={cardVariants}
              whileHover={hoverScale}
            >
              <div className="feature-card text-center p-3">
                <h4 className="h5 mb-3">{feature.title}</h4>
                <p className="mb-3">{feature.description}</p>
                <i
                  className={`bi ${feature.icon} fs-2`}
                  style={{ color: isDarkMode ? COLORS.primary : COLORS.secondary }}
                ></i>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default FeaturesSection;