import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import NoteList from "./NoteList.jsx";
import ReadingMode from "./ReadingMode.jsx";
import EditNoteForm from "./EditNoteForm.jsx";
import { COLORS } from "../../utils/colors";
import { showToast } from "../../utils/toastUtils";
import "./NotesPage.css";

function NotesPage() {
  const { isDarkMode } = useContext(DarkModeContext) || { isDarkMode: false };
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("list");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Validate data is an array; default to [] if not
      setNotes(Array.isArray(data) ? data : []);
      if (!Array.isArray(data)) {
        console.warn("Invalid notes data received:", data);
        showToast.error("Received invalid notes data from server.");
      }
    } catch (err) {
      console.error("Fetch notes error:", err);
      setError(err.message);
      showToast.error("Error fetching notes: " + err.message);
      setNotes([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete note");
      }
      setNotes(notes.filter((note) => note._id !== id));
      showToast.success("Note deleted successfully!");
    } catch (err) {
      console.error("Delete note error:", err);
      showToast.error("Error deleting note: " + err.message);
    }
  };

  if (error) {
    return (
      <div
        className="notes-page-container"
        style={{
          backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight,
          color: isDarkMode ? COLORS.textDark : COLORS.textLight,
        }}
      >
        <main className="container py-4">
          <h1 className="mb-3">My Notes</h1>
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        </main>
      </div>
    );
  }

  return (
    <motion.div
      className="notes-page-container"
      style={{
        backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight,
        color: isDarkMode ? COLORS.textDark : COLORS.textLight,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}>My Notes</h1>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="modeToggle"
              checked={mode === "reading"}
              onChange={() => setMode(mode === "list" ? "reading" : "list")}
              aria-label="Toggle between List and Reading modes"
            />
            <label
              className="form-check-label"
              htmlFor="modeToggle"
              style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}
            >
              {mode === "list" ? "Switch to Reading Mode" : "Switch to List Mode"}
            </label>
          </div>
        </div>
        {isLoading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: "2rem", height: "2rem" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : editingNote ? (
          <EditNoteForm
            note={editingNote}
            onSave={() => fetchNotes()}
            onCancel={() => setEditingNote(null)}
          />
        ) : mode === "list" ? (
          <>
            <button
              className="btn btn-primary mb-3"
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.textDark,
                border: "none",
              }}
              onClick={() => setEditingNote({ title: "", content: "", videoId: "" })}
              aria-label="Create new note"
            >
              Create New Note
            </button>
            <NoteList notes={notes} onEdit={setEditingNote} onDelete={handleDelete} />
          </>
        ) : (
          <ReadingMode notes={notes} onEdit={setEditingNote} onDelete={handleDelete} />
        )}
      </main>
    </motion.div>
  );
}

NotesPage.propTypes = {};

export default NotesPage;