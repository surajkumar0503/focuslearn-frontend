export const validateLink = (url) => {
  return url && (url.includes("youtube.com") || url.includes("youtu.be"));
};

export const extractVideoId = (url) => {
  const regex = /[?&]v=([^&#]*)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const extractPlaylistId = (url) => {
  const regex = /[?&]list=([^&#]*)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};