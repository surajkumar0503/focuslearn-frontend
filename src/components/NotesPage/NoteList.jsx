import React, { useContext } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import NoteCard from "./NoteCard.jsx";
import { COLORS } from "../../utils/colors";
import "./NoteList.css";

function NoteList({ notes, onEdit, onDelete }) {
  const { isDarkMode } = useContext(DarkModeContext) || { isDarkMode: false };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="note-list-container"
      style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="row g-3">
        {notes.length === 0 ? (
          <p className="text-center" style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}>
            No notes available. Create a new note!
          </p>
        ) : (
          notes.map((note) => (
            <NoteCard key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </motion.div>
  );
}

NoteList.propTypes = {
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

export default NoteList;