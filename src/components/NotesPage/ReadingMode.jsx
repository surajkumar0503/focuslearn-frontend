import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import MarkdownRenderer from "../MainApp/MarkdownRenderer";
import { COLORS } from "../../utils/colors";
import "./ReadingMode.css";

function ReadingMode({ notes, onEdit, onDelete }) {
  const { isDarkMode } = useContext(DarkModeContext) || { isDarkMode: false };
  const [currentPage, setCurrentPage] = useState(0);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    onDelete(id);
  };

  const nextPage = () => {
    if (currentPage < notes.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToPage = (index) => {
    setCurrentPage(index);
  };

  const pageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <div className="reading-mode-container">
      {notes.length === 0 ? (
        <p className="text-center" style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight, fontSize: "16px" }}>
          No notes available. Create a new note in List Mode!
        </p>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={notes[currentPage]._id}
              className="reading-page"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100 && currentPage < notes.length - 1) nextPage();
                if (info.offset.x > 100 && currentPage > 0) prevPage();
              }}
              style={{
                backgroundColor: isDarkMode ? "#2A2F33" : "#F8F9FA",
                color: isDarkMode ? COLORS.textDark : COLORS.textLight,
              }}
            >
              <div className="page-content">
                {notes[currentPage].title && (
                  <h3 className="page-title" style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}>
                    {notes[currentPage].title}
                  </h3>
                )}
                <h6 className="page-subtitle" style={{ color: COLORS.subtitle }}>
                  Video ID: {notes[currentPage].videoId || "N/A"} |{" "}
                  {new Date(notes[currentPage].createdAt).toLocaleString()}
                </h6>
                <div className="markdown-content">
                  <MarkdownRenderer markdown={notes[currentPage].content} />
                </div>
                <div className="page-buttons">
                  <button
                    className="btn btn-sm btn-primary"
                    style={{
                      backgroundColor: COLORS.primary,
                      color: COLORS.textDark,
                      border: "none",
                    }}
                    onClick={() => onEdit(notes[currentPage])}
                    aria-label={`Edit note titled ${notes[currentPage].title || "Untitled"}`}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    style={{
                      backgroundColor: COLORS.danger,
                      color: COLORS.textDark,
                      border: "none",
                    }}
                    onClick={() => handleDelete(notes[currentPage]._id)}
                    aria-label={`Delete note titled ${notes[currentPage].title || "Untitled"}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="navigation-controls">
            <button
              className="nav-button"
              onClick={prevPage}
              disabled={currentPage === 0}
              aria-label="Previous page"
            >
              &lt;
            </button>
            <div className="pagination-dots">
              {notes.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentPage ? "active" : ""}`}
                  onClick={() => goToPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
            <button
              className="nav-button"
              onClick={nextPage}
              disabled={currentPage === notes.length - 1}
              aria-label="Next page"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

ReadingMode.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      videoId: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReadingMode;