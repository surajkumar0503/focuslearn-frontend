import React, { useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { DarkModeContext } from "../../context/DarkModeContext";
import MarkdownRenderer from "../MainApp/MarkdownRenderer";
import { COLORS } from "../../utils/colors";
import { showToast } from "../../utils/toastUtils";
import "./EditNoteForm.css";

function EditNoteForm({ note, onSave, onCancel }) {
  const { isDarkMode } = useContext(DarkModeContext) || { isDarkMode: false };
  const [form, setForm] = useState({
    title: note.title || "",
    content: note.content || "",
    videoId: note.videoId || "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const editFormRef = useRef(null);

  const handleSave = async (e) => {
    e.preventDefault();
    const sanitizedTitle = form.title.trim();
    const sanitizedContent = form.content.trim();
    if (!sanitizedContent) {
      showToast.error("Content cannot be empty!");
      return;
    }
    try {
      const method = note._id ? "PUT" : "POST";
      const url = note._id
        ? `${import.meta.env.VITE_API_URL}/notes/${note._id}`
        : `${import.meta.env.VITE_API_URL}/notes`;
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: sanitizedTitle,
          content: sanitizedContent,
          videoId: form.videoId || "",
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save note");
      }
      showToast.success(note._id ? "Note updated successfully!" : "Note created successfully!");
      onSave();
      onCancel();
    } catch (err) {
      console.error("Save note error:", err);
      showToast.error("Error saving note: " + err.message);
    }
  };

  return (
    <motion.div
      className="edit-note-form card p-4"
      ref={editFormRef}
      style={{
        backgroundColor: isDarkMode ? "#2A2F33" : "#F8F9FA",
        color: isDarkMode ? COLORS.textDark : COLORS.textLight,
        borderColor: COLORS.primary,
      }}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}>
        {note._id ? "Edit Note" : "Create Note"}
      </h3>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label
            htmlFor="note-title"
            className="form-label"
            style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}
          >
            Title (optional)
          </label>
          <input
            id="note-title"
            type="text"
            className="form-control"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter title"
            aria-label="Note title"
            style={{ borderColor: COLORS.primary }}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="note-content"
            className="form-label"
            style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}
          >
            Content
          </label>
          <textarea
            id="note-content"
            className="form-control"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Write your note in Markdown"
            rows={5}
            aria-label="Note content"
            style={{ borderColor: COLORS.primary }}
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="note-preview"
            className="form-label"
            style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}
          >
            Preview
          </label>
          <button
            type="button"
            className="btn btn-sm btn-secondary ms-2"
            onClick={() => setShowPreview(!showPreview)}
            style={{
              backgroundColor: COLORS.secondary,
              color: COLORS.textDark,
              border: "none",
            }}
            aria-label={showPreview ? "Hide preview" : "Show preview"}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
          {showPreview && (
            <div
              className="markdown-content mt-2"
              style={{
                backgroundColor: isDarkMode ? "#2A2F33" : "#F8F9FA",
                padding: "8px",
                borderRadius: "5px",
                border: `1px solid ${COLORS.primary}`,
                color: isDarkMode ? COLORS.textDark : COLORS.textLight,
              }}
            >
              <MarkdownRenderer markdown={form.content} />
            </div>
          )}
        </div>
        <div className="mb-3">
          <label
            htmlFor="note-videoId"
            className="form-label"
            style={{ color: isDarkMode ? COLORS.textDark : COLORS.textLight }}
          >
            Video ID (optional)
          </label>
          <input
            id="note-videoId"
            type="text"
            className="form-control"
            value={form.videoId}
            onChange={(e) => setForm({ ...form, videoId: e.target.value })}
            placeholder="Enter YouTube video ID"
            aria-label="Video ID"
            style={{ borderColor: COLORS.primary }}
          />
        </div>
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: COLORS.primary,
              color: COLORS.textDark,
              border: "none",
            }}
            aria-label="Save note"
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            style={{
              backgroundColor: COLORS.secondary,
              color: COLORS.textDark,
              border: "none",
            }}
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

EditNoteForm.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    videoId: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditNoteForm;