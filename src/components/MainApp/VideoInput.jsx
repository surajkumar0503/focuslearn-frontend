// C:/Users/Dell/Desktop/FocusTube-Testing/JS_FOCUSLEARN_4/frontend/src/components/VideoInput.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

// VideoInput: Form for entering YouTube URL with arrow button to submit
function VideoInput({ videoUrl, setVideoUrl, isValid, fetchVideoData }) {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Submitting URL:", videoUrl); // Debug: Log submission
    if (isValid) {
      console.log("Valid URL, calling fetchVideoData");
      fetchVideoData(videoUrl); // Call fetch function
      toast.info("Processing URL..."); // Debug: Confirm submission
    } else {
      console.log("Invalid URL, not submitting");
      toast.error("Please enter a valid YouTube URL"); // Debug: Notify invalid
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center">
      <div className="input-group">
        <input
          type="text"
          className={`form-control ${isValid ? "is-valid" : videoUrl ? "is-invalid" : ""}`}
          placeholder="Enter YouTube video or playlist URL"
          value={videoUrl}
          onChange={(e) => {
            console.log("Input changed:", e.target.value); // Debug: Log input
            setVideoUrl(e.target.value);
          }}
          aria-label="YouTube URL"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!isValid}
          aria-label="Submit URL"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default VideoInput;