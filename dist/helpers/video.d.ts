import { Video } from '../models/Video';
export declare function getYoutubeVideoId(url?: string): string | null;
export declare function getEmbededUrl(url: string): string | null;
export declare function getEmbeddedUrlFromObj(video: Video): string;
