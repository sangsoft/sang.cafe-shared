"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbeddedUrlFromObj = exports.getEmbededUrl = exports.getYoutubeVideoId = void 0;
const querystring_1 = require("querystring");
function getYoutubeVideoId(url) {
    if (!url) {
        return null;
    }
    console.log('Getting VIDEO id:', url);
    try {
        const urlObj = new URL(url);
        { /* https://youtu.be/zExyk0WnFN4 */ }
        { /* https://www.youtube.com/embed/zExyk0WnFN4 */ }
        { /* https://www.youtube.com/watch?v=zExyk0WnFN4&ab_channel=BadGuyGoodAudioReviews */ }
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.substring(1, urlObj.pathname.length);
        }
        else if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname == '/watch') {
            return (0, querystring_1.parse)(urlObj.search.substring(1, urlObj.search.length)).v;
        }
        else if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname.startsWith('/embed/')) {
            return urlObj.pathname.split('/')[2];
        }
        return null;
    }
    catch (e) {
        return null;
    }
}
exports.getYoutubeVideoId = getYoutubeVideoId;
function getEmbededUrl(url) {
    const defaultYoutubeEmbedHost = 'https://www.youtube.com/embed/';
    const videoId = getYoutubeVideoId(url);
    console.log('Found video ID:', videoId);
    if (!videoId) {
        return null;
    }
    return `${defaultYoutubeEmbedHost}/${videoId}`;
}
exports.getEmbededUrl = getEmbededUrl;
function getEmbeddedUrlFromObj(video) {
    if (video.embededUrl) {
        return video.embededUrl;
    }
    else {
        return getEmbededUrl(video.url);
    }
}
exports.getEmbeddedUrlFromObj = getEmbeddedUrlFromObj;
//# sourceMappingURL=video.js.map