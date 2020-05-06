"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromExifData(url, exif) {
    return { url };
}
exports.fromExifData = fromExifData;
function toPhoto(photo) {
    if (typeof photo === 'string') {
        return {
            url: photo
        };
    }
    else {
        return photo;
    }
}
exports.toPhoto = toPhoto;
//# sourceMappingURL=Photo.js.map