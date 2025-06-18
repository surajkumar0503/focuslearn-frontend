import { useState } from "react";
import { toast as showToast } from "react-toastify";

const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

const useVideoData = () => {
  const [videoData, setVideoData] = useState(null);
  const [playlistData, setPlaylistData] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const extractVideoId = (url) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const extractPlaylistId = (url) => {
    const regex = /[?&]list=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const fetchVideoData = async (url) => {
    try {
      const isPlaylist = url.includes("list=");
      if (isPlaylist) {
        await fetchPlaylistData(url);
        return;
      }
      const videoId = extractVideoId(url);
      if (!videoId) {
        showToast.error("Invalid YouTube video link!");
        return;
      }
      const response = await fetchWithRetry(`${import.meta.env.VITE_API_URL}/fetch_video`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }
      const data = await response.json();
      setVideoData(data);
      setSelectedVideoId(videoId);
      showToast.success("Video data fetched successfully!");
    } catch (err) {
      console.error("Fetch video error:", err);
      showToast.error(`Error fetching video data: ${err.message}`);
    }
  };

  const fetchPlaylistData = async (url) => {
    try {
      const playlistId = extractPlaylistId(url);
      if (!playlistId) {
        showToast.error("Invalid YouTube playlist link!");
        return;
      }
      const response = await fetchWithRetry(`${import.meta.env.VITE_API_URL}/fetch_playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }
      const data = await response.json();
      setPlaylistData(data);
      showToast.success("Playlist data fetched successfully!");
    } catch (err) {
      console.error("Fetch playlist error:", err);
      showToast.error(`Error fetching playlist data: ${err.message}`);
    }
  };

  return {
    videoData,
    playlistData,
    selectedVideoId,
    fetchVideoData,
    fetchPlaylistData,
    setSelectedVideoId,
  };
};

export default useVideoData;