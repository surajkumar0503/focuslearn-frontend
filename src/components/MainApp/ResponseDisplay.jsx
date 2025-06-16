import { LuCopy } from "react-icons/lu";
import MarkdownRenderer from "./MarkdownRenderer";
import { toast } from "react-toastify";
import { useState } from "react";

function ResponseDisplay({ displayText, videoId }) {
  const [isCopyClicked, setIsCopyClicked] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const sanitizedText = (displayText || "")
    .replace(/[-\u001F\u007F-\u009F]/g, "") // Remove control characters
    .replace(/(^|\s)te\b/gi, "$1The")
    .replace(/(^|\s)the\b/gi, "$1The")
    .replace(/(^|\s)th\b/gi, "$1The")
    .replace(/(^|\s)tis\b/gi, "$1This")
    .replace(/(^|\s)baed|bsed\b/gi, "$1Based")
    .replace(/(^|\s)hee\b/gi, "$1Here")
    .replace(/undefined|null/g, "")
    .replace(/unfortunately/gi, "Unfortunately")
    .replace(/\bsince\b/gi, "Since")
    .trim();

  if (!sanitizedText) return null;

  const handleCopy = async () => {
    setIsCopyClicked(true);
    try {
      await navigator.clipboard.writeText(sanitizedText);
      toast.success("Text copied to clipboard!", { autoClose: 2000 });
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy text.");
    }
    setTimeout(() => setIsCopyClicked(false), 200);
  };

  const handleSaveNote = async () => {
    setIsSaveClicked(true);
    if (!videoId) {
      toast.error("No video ID available.");
      setIsSaveClicked(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, content: sanitizedText, title: "" }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save note");
      }
      toast.success("Note saved successfully!");
    } catch (error) {
      console.error("Save note failed:", error);
      toast.error(`Failed to save note: ${error.message}`);
    } finally {
      setTimeout(() => setIsSaveClicked(false), 200);
    }
  };

  return (
    <div
      className="rounded-2"
      style={{
        whiteSpace: "pre-wrap",
        marginLeft: "20px",
        marginRight: "10px",
        padding: "8px", // Minimal padding
        backgroundColor: "#F8F9FA", // Fixed light grey background
        position: "relative",
      }}
    >
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "10px",
          right: "40px",
          padding: "8px",
          fontSize: "1.2rem",
          cursor: "pointer",
          backgroundColor: "#CCCCCC", // Fixed button background
          color: "#141619", // Fixed text color
          border: "none",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: isCopyClicked ? "buttonClick 0.2s ease" : "none",
          minWidth: "44px",
          minHeight: "40px",
        }}
        aria-label="Copy response text"
        title="Copy text"
      >
        <LuCopy />
      </button>
      <button
        onClick={handleSaveNote}
        style={{
          position: "absolute",
          top: "10px",
          right: "90px",
          padding: "8px 16px",
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#CCCCCC", // Fixed button background
          color: "#141619", // Fixed text color
          border: "none",
          borderRadius: "5px",
          animation: isSaveClicked ? "buttonClick 0.2s ease" : "none",
          minWidth: "80px",
          minHeight: "40px",
          marginRight: "10px",
        }}
        aria-label="Save note"
        title="Save as note"
      >
        Save Note
      </button>
      <div
        className="markdown-content"
        style={{
          marginTop: "3rem",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.5",
          color: "#141619", // Fixed text color
          fontSize: "16px", // Constant font size
          maxWidth: "100%",
        }}
      >
        <MarkdownRenderer markdown={sanitizedText} />
      </div>
      <style jsx>{`
        @keyframes buttonClick {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @media (max-width: 575.98px) {
          div.rounded-2 {
            margin-left: 10px !important;
            margin-right: 10px !important;
            padding: 8px !important; // Minimal padding
          }
          .markdown-content {
            margin-top: 3rem !important;
            font-size: 16px !important; // Constant font size
            color: #141619 !important; // Fixed text color
          }
          button {
            padding: 6px !important;
            font-size: 12px !important;
            top: 5px !important;
          }
          button[aria-label="Copy response text"] {
            right: 30px !important;
          }
          button[aria-label="Save note"] {
            right: 70px !important;
            padding: 6px 12px !important;
          }
        }
        @media (min-width: 576px) and (max-width: 991.98px) {
          div.rounded-2 {
            margin-left: 20px !important;
            margin-right: 15px !important;
            padding: 8px !important; // Minimal padding
          }
          .markdown-content {
            margin-top: 1.8rem !important;
            font-size: 16px !important; // Constant font size
            color: #141619 !important; // Fixed text color
          }
          button {
            padding: 7px !important;
            font-size: 14px !important;
            top: 8px !important;
          }
          button[aria-label="Copy response text"] {
            right: 35px !important;
          }
          button[aria-label="Save note"] {
            right: 80px !important;
            padding: 7px 14px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default ResponseDisplay;