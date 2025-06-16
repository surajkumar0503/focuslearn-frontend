import { useState, useEffect } from "react";
import { showToast } from "../utils/toastUtils";
import { validateLink, extractVideoId, extractPlaylistId } from "../utils/youtubeUtils";

export function useVideoData(videoUrl) {
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(validateLink(videoUrl));
  }, [videoUrl]);

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/fetch_video`, {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/fetch_playlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error");
      }
      const data = await response.json();
      setVideoData({ videos: data.videos });
      setSelectedVideoId(data.videos[0]?.id);
      showToast.success("Playlist data fetched successfully!");
    } catch (err) {
      console.error("Fetch playlist error:", err);
      showToast.error(`Error fetching playlist data: ${err.message}`);
    }
  };

  return {
    selectedVideoId,
    setSelectedVideoId,
    videoData,
    isValid,
    fetchVideoData,
  };
}