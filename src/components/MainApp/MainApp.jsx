import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import VideoPlayer from "./VideoPlayer.jsx";
import PlaylistPanel from "./PlaylistPanel.jsx";
import VideoInput from "./VideoInput.jsx";
import QueryInput from "./QueryInput";
import ResponseDisplay from "./ResponseDisplay.jsx";
import { DarkModeContext } from "../../context/DarkModeContext";
import { useVideoData } from "../../hooks/useVideoData";
import { COLORS } from "../../utils/colors";
import "./MainApp.css";

function MainApp() {
  const { isDarkMode } = useContext(DarkModeContext);
  const [videoUrl, setVideoUrl] = useState("");
  const [displayText, setDisplayText] = useState("");
  const { selectedVideoId, setSelectedVideoId, videoData, isValid, fetchVideoData } = useVideoData(videoUrl);

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const isPlaylist = Array.isArray(videoData?.videos) && videoData.videos.length > 1;

  return (
    <div
      className="main-app-container"
      style={{
        backgroundColor: isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight,
        color: isDarkMode ? COLORS.textDark : COLORS.textLight,
        "--scrollbar-track": isDarkMode ? COLORS.backgroundDark : COLORS.backgroundLight,
        "--scrollbar-thumb": isDarkMode ? COLORS.secondary : COLORS.subtitle,
        "--scrollbar-thumb-hover": isDarkMode ? COLORS.primary : COLORS.secondary,
      }}
    >
      <main className="main-app-content container-fluid">
        <div className="app-container">
          {!selectedVideoId ? (
            <div className="initial-video-input-wrapper">
              <VideoInput
                videoUrl={videoUrl}
                setVideoUrl={setVideoUrl}
                isValid={isValid}
                fetchVideoData={fetchVideoData}
                aria-label="Enter YouTube video or playlist URL"
              />
            </div>
          ) : isPlaylist ? (
            <div className="row w-100">
              <div className="col-12 col-lg-8 main-app-left">
                <div className="video-input-container">
                  <VideoInput
                    videoUrl={videoUrl}
                    setVideoUrl={setVideoUrl}
                    isValid={isValid}
                    fetchVideoData={fetchVideoData}
                    aria-label="Enter YouTube video or playlist URL"
                  />
                </div>
                <VideoPlayer videoId={selectedVideoId} />
                <QueryInput selectedVideoId={selectedVideoId} setDisplayText={setDisplayText} />
                <div className="response-container custom-scrollbar">
                  <ResponseDisplay displayText={displayText} videoId={selectedVideoId} />
                </div>
              </div>
              <div className="col-12 col-lg-4 main-app-right custom-scrollbar">
                {videoData?.videos && (
                  <PlaylistPanel videos={videoData.videos} onVideoSelect={handleVideoSelect} />
                )}
              </div>
            </div>
          ) : (
            <div className="col-12 main-app-single">
              <div className="video-input-container">
                <VideoInput
                  videoUrl={videoUrl}
                  setVideoUrl={setVideoUrl}
                  isValid={isValid}
                  fetchVideoData={fetchVideoData}
                  aria-label="Enter YouTube video or playlist URL"
                />
              </div>
              <VideoPlayer videoId={selectedVideoId} />
              <QueryInput selectedVideoId={selectedVideoId} setDisplayText={setDisplayText} />
              <div className="response-container custom-scrollbar">
                <ResponseDisplay displayText={displayText} videoId={selectedVideoId} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

MainApp.propTypes = {
  // No props currently, added for future extensibility
};

export default MainApp;