import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { COLORS } from "../../utils/colors";

function HowItWorksSection({ isDarkMode }) {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const slideIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const pulse = {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 1.5 },
  };

  const steps = [
    {
      title: "Paste Video Link",
      description: "Paste a YouTube video or playlist URL to start your learning session.",
    },
    {
      title: "Watch Seamlessly",
      description: "Enjoy an ad-free, distraction-free video player tailored for learning.",
    },
    {
      title: "Query with AI",
      description: "Ask questions about the video content and receive AI-generated insights.",
    },
    {
      title: "Save Your Notes",
      description: "Capture transcripts and notes, organized for easy access and review.",
    },
  ];

  return (
    <motion.section
      className="how-it-works slide py-5"
      initial="hidden"
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true }}
    >
      <div className="container">
        <motion.h2
          className="text-center mb-5"
          style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}
          variants={slideIn}
        >
          How FocusLearn Works
        </motion.h2>
        <div className="steps-container d-flex flex-column flex-md-row justify-content-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step text-center px-3"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
            >
              <span className="step-number">{index + 1}</span>
              <h4 className="h5 mb-3">{step.title}</h4>
              <p className="mb-3">{step.description}</p>
              <i
                className={`bi ${step.icon} fs-2`}
                style={{ color: isDarkMode ? COLORS.primary : COLORS.secondary }}
              ></i>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default HowItWorksSection;