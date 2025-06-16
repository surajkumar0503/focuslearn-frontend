import React from "react";

function VideoPlayer({ videoId }) {
  if (!videoId) return null;

  return (
    <div
      className="video-player-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Changed to use full available width for responsiveness
        maxWidth: "850px", // Added to limit width in desktop view
        maxHeight: "calc(100vh - 150px)", // Adjusted to prevent overflow on small screens
        padding: "10px", // Default padding, adjusted in media queries
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <iframe
        style={{
          width: "100%",
          height: "100%",
          aspectRatio: "16/9", // Maintains 16:9 aspect ratio for dynamic height
          border: "none",
          display: "block",
          position: "relative",
        }}
        src={`https://www.youtube.com/embed/${videoId}?rel=0&controls=1&autoplay=0&modestbranding=1&iv_load_policy=3`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        aria-label={`YouTube video: ${videoId}`}
      />
      {/* Inline CSS for responsive video player */}
      <style jsx>{`
        .video-player-container {
          width: 100% !important; // Ensure full width within parent
        }
        @media (max-width: 575.98px) {
          .video-player-container {
            padding: 5px !important; // Reduced padding for phone view
            max-width: 100% !important; // Full width for phones
          }
        }
        @media (min-width: 576px) and (max-width: 991.98px) {
          .video-player-container {
            padding: 8px !important; // Moderate padding for tablet view
            max-width: 95% !important; // Slightly less than full width for tablets
          }
        }
        @media (min-width: 992px) {
          .video-player-container {
            max-width: 850px !important; // Limit width for desktop
            padding: 10px !important; // Original padding for desktop
          }
        }
      `}</style>
    </div>
  );
}

export default VideoPlayer;