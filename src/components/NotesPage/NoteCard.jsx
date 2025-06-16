import React, { useContext } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import MarkdownRenderer from "../MainApp/MarkdownRenderer";
import { COLORS } from "../../utils/colors";
import "./NoteCard.css";

function NoteCard({ note, onEdit, onDelete }) {
  const { isDarkMode } = useContext(DarkModeContext) || { isDarkMode: false };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    onDelete(note._id);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="note-card mb-3"
      style={{
        backgroundColor: isDarkMode ? "#2A2F33" : "#F8F9FA",
        color: isDarkMode ? COLORS.textDark : COLORS.textLight,
        borderColor: COLORS.primary,
      }}
      variants={cardVariants}
      whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="note-card-content">
        {note.title && (
          <h5 className="card-title" style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}>
            {note.title}
          </h5>
        )}
        <h6 className="card-subtitle mb-2" style={{ color: COLORS.subtitle }}>
          Video ID: {note.videoId || "N/A"} | {new Date(note.createdAt).toLocaleString()}
        </h6>
        <div className="markdown-content">
          <MarkdownRenderer markdown={note.content} />
        </div>
      </div>
      <div className="note-card-buttons">
        <button
          className="btn btn-sm btn-primary"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.textDark,
            border: "none",
          }}
          onClick={() => onEdit(note)}
          aria-label={`Edit note titled ${note.title || "Untitled"}`}
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
          onClick={handleDelete}
          aria-label={`Delete note titled ${note.title || "Untitled"}`}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}

NoteCard.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    videoId: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteCard;