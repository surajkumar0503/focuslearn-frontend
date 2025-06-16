export const validateLink = (link) => {
  return /(?:https?:\/\/)?(?:www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/playlist\?list=)/.test(link);
};

export const extractVideoId = (url) => {
  const match = url.match(
    /(?:https:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

export const extractPlaylistId = (url) => {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};