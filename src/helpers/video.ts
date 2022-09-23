import { parse } from 'querystring';
import { Video } from '../models/Video';

export function getYoutubeVideoId(url?: string): string | null {
  if (!url) {
    return null;
  }

  console.log('Getting VIDEO id:', url);
  try {
    const urlObj = new URL(url);

    {/* https://youtu.be/zExyk0WnFN4 */ }
    {/* https://www.youtube.com/embed/zExyk0WnFN4 */ }
    {/* https://www.youtube.com/watch?v=zExyk0WnFN4&ab_channel=BadGuyGoodAudioReviews */ }
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.substring(1, urlObj.pathname.length);
    } else if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname == '/watch') {
      return parse(urlObj.search.substring(1, urlObj.search.length)).v as string;
    } else if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname.startsWith('/embed/')) {
      return urlObj.pathname.split('/')[2];
    }

    return null;
  } catch (e) {
    return null;
  }
}

export function getEmbededUrl(url: string): string | null {
  const defaultYoutubeEmbedHost = 'https://www.youtube.com/embed/';
  const videoId = getYoutubeVideoId(url);

  if (!videoId) {
    return null;
  }

  return `${defaultYoutubeEmbedHost}/${videoId}`;
}

export function getEmbeddedUrlFromObj(video: Video): string {
  if (video.embededUrl) {
    return video.embededUrl;
  } else {
    return getEmbededUrl(video.url);
  }
}