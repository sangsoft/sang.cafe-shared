"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPhoto = exports.fromExifData = exports.getSmallBannerPhotoUrl = exports.getBannerPhotoUrl = exports.getPhotoCloudinaryPublicId = exports.getMainThumbHeight = exports.getMainPhotoMedUrl = exports.getMedUrl = exports.getThumbUrl = exports.getMainPhotoThumbUrl = exports.getMainPhotoUrl = exports.getMainPhotoObj = exports.getMedObj = exports.getThumpObj = exports.getUrl = exports.moveMainPhotoFirst = void 0;
const querystring_1 = require("querystring");
function booleanToNumber(b) {
    return (b || false) ? 1 : 0;
}
function moveMainPhotoFirst(photos) {
    return photos.sort((p1, p2) => {
        return booleanToNumber(p2.main) - booleanToNumber(p1.main);
    });
}
exports.moveMainPhotoFirst = moveMainPhotoFirst;
function getUrl(photo) {
    var _a;
    let url = ((_a = toPhoto(photo)) === null || _a === void 0 ? void 0 : _a.url) || '';
    if (url === '') {
        return url;
    }
    try {
        let urlObj = new URL(url);
        const query = (0, querystring_1.parse)(urlObj.search);
        if (!query.alt) {
            query.alt = 'media';
        }
        urlObj.search = (0, querystring_1.stringify)(query);
        return urlObj.toString();
    }
    catch (e) {
        console.warn(e);
        return url;
    }
}
exports.getUrl = getUrl;
function getThumpObj(photo) {
    if (!photo) {
        return '';
    }
    if (typeof photo === 'string') {
        return photo;
    }
    if (photo.sml) {
        return photo.sml;
    }
    if (photo.med) {
        return photo.med;
    }
    return photo;
}
exports.getThumpObj = getThumpObj;
function getMedObj(photo) {
    if (!photo) {
        return '';
    }
    if (typeof photo === 'string') {
        return photo;
    }
    if (photo.med) {
        return photo.med;
    }
    if (photo.sml) {
        return photo.sml;
    }
    return photo;
}
exports.getMedObj = getMedObj;
function getMainPhotoObj(restaurant) {
    if (!restaurant.photos) {
        return '';
    }
    let photo = restaurant.photos.find((photo) => {
        if (typeof photo === 'string') {
            return false;
        }
        return photo === null || photo === void 0 ? void 0 : photo.main;
    });
    if (!photo) {
        photo = restaurant.photos[0];
    }
    if (!photo) {
        return '';
    }
    return photo;
}
exports.getMainPhotoObj = getMainPhotoObj;
function getMainPhotoUrl(restaurant) {
    return getUrl(getMainPhotoObj(restaurant));
}
exports.getMainPhotoUrl = getMainPhotoUrl;
function getMainPhotoThumbUrl(restaurant) {
    return (getThumbUrl(getMainPhotoObj(restaurant)) || getThumbUrl(restaurant.menuPhotoUrl) || getUrl(restaurant.menuPhotoUrl));
}
exports.getMainPhotoThumbUrl = getMainPhotoThumbUrl;
function getThumbUrl(photo) {
    return getUrl(getThumpObj(photo));
}
exports.getThumbUrl = getThumbUrl;
function getMedUrl(photo) {
    return getUrl(getMedObj(photo));
}
exports.getMedUrl = getMedUrl;
function getMainPhotoMedUrl(restaurant) {
    return (getMedUrl(getMainPhotoObj(restaurant)) || getMedUrl(restaurant.menuPhotoUrl) || getUrl(restaurant.menuPhotoUrl));
}
exports.getMainPhotoMedUrl = getMainPhotoMedUrl;
function getMainThumbHeight(restaurant) {
    let mainPhoto = getMainPhotoObj(restaurant);
    let thumb = getThumpObj(mainPhoto);
    if (!thumb) {
        return -1;
    }
    if (typeof thumb === 'string') {
        return -1;
    }
    if (!thumb.dimensions) {
        return -1;
    }
    return thumb.dimensions.height;
}
exports.getMainThumbHeight = getMainThumbHeight;
function getPhotoCloudinaryPublicId(photo) {
    const thePhoto = toPhoto(photo);
    if (thePhoto === null || thePhoto === void 0 ? void 0 : thePhoto.cloudinary) {
        return thePhoto.cloudinary.public_id;
    }
    return getUrl(photo);
}
exports.getPhotoCloudinaryPublicId = getPhotoCloudinaryPublicId;
function getBannerPhotoUrl(restaurant) {
    if (restaurant.bannerPhotoUrl) {
        return getMedUrl(restaurant.bannerPhotoUrl);
    }
    else {
        return getMainPhotoMedUrl(restaurant);
    }
}
exports.getBannerPhotoUrl = getBannerPhotoUrl;
function getSmallBannerPhotoUrl(restaurant) {
    if (restaurant.bannerPhotoUrl) {
        return getThumbUrl(restaurant.bannerPhotoUrl);
    }
    else {
        return getMainPhotoThumbUrl(restaurant);
    }
}
exports.getSmallBannerPhotoUrl = getSmallBannerPhotoUrl;
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
//# sourceMappingURL=photos.js.map