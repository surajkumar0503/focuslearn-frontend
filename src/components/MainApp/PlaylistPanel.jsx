import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DarkModeContext } from "../../context/DarkModeContext";

// PlaylistPanel: Displays a list of videos with square thumbnails and wrapped titles
function PlaylistPanel({ videos, onVideoSelect }) {
  const { isDarkMode, colors } = useContext(DarkModeContext);

  return (
    <div
      className="playlist-panel"
      style={{
        width: "100%",
        borderLeft: "5px solid #000000",
        padding: "10px",
        backgroundColor: isDarkMode ? "#2c2c2c" : "#f8f9fa",
      }}
    >
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: colors.text,
          margin: "0 0 10px 0",
          textAlign: "left",
        }}
      >
        Playlist
      </h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {videos.map((video, index) => (
          <li
            key={video.id || index}
            onClick={() => onVideoSelect(video.id)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
              margin: 0,
              padding: 0,
              borderBottom: "1px solid rgba(0,0,0,0.1)",
              backgroundColor: isDarkMode ? "#3a3a3a" : "#ffffff",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#4a4a4a" : "#e0e0e0")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#3a3a3a" : "#ffffff")}
          >
            <img
              src={video.thumbnail || "https://via.placeholder.com/80"}
              alt={video.title}
              style={{
                width: "100px",
                height: "90px",
                objectFit: "cover",
                marginRight: "10px",
                borderRadius: 0,
              }}
            />
            <div
              style={{
                flexGrow: 1,
                fontSize: "1rem",
                color: colors.text,
                whiteSpace: "normal",
                wordBreak: "break-word",
                lineHeight: "1.4",
              }}
            >
              {video.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistPanel;