import type { Photo } from "../models/Photo";
import type { IRestaurant } from "../models/Restaurant";
import { parse, stringify } from 'querystring'

function booleanToNumber(b?: boolean | null): number {
  return (b || false) ? 1 : 0;
}

export function moveMainPhotoFirst(photos: { main?: boolean }[]): { main?: boolean }[] {
  return photos.sort((p1, p2) => {
    return booleanToNumber(p2.main) - booleanToNumber(p1.main);
  })
}

export function getUrl(photo: string | Photo): string {
  let url = toPhoto(photo)?.url || '';

  if (url === '') {
    return url;
  }

  try {
    let urlObj = new URL(url);
    const query = parse(urlObj.search);
    if (!query.alt) {
      query.alt = 'media';
    }
    urlObj.search = stringify(query);

    return urlObj.toString();
  } catch (e) {
    console.warn(e);
    return url;
  }
}

export function getThumpObj(photo: string | Photo): string | Photo {
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

export function getMedObj(photo: string | Photo): string | Photo {
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

export function getMainPhotoObj(restaurant: IRestaurant): string | Photo {
  if (!restaurant.photos) {
    return '';
  }

  let photo = restaurant.photos.find((photo) => {
    if (typeof photo === 'string') {
      return false;
    }

    return photo?.main;
  });

  if (!photo) {
    photo = restaurant.photos[0];
  }

  if (!photo) {
    return '';
  }

  return photo;
}

export function getMainPhotoUrl(restaurant: IRestaurant): string {
  return getUrl(getMainPhotoObj(restaurant));
}

export function getMainPhotoThumbUrl(restaurant: IRestaurant): string {
  return (
    getThumbUrl(getMainPhotoObj(restaurant)) || getThumbUrl(restaurant.menuPhotoUrl) || getUrl(restaurant.menuPhotoUrl)
  );
}

export function getThumbUrl(photo: string | Photo): string {
  return getUrl(getThumpObj(photo));
}

export function getMedUrl(photo: string | Photo): string {
  return getUrl(getMedObj(photo));
}

export function getMainPhotoMedUrl(restaurant: IRestaurant): string {
  return (
    getMedUrl(getMainPhotoObj(restaurant)) || getMedUrl(restaurant.menuPhotoUrl) || getUrl(restaurant.menuPhotoUrl)
  );
}

export function getMainThumbHeight(restaurant: IRestaurant): number {
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

export function getPhotoCloudinaryPublicId(photo: string | Photo): string {
  const thePhoto = toPhoto(photo);
  if (thePhoto?.cloudinary) {
    return thePhoto.cloudinary.public_id;
  }

  return getUrl(photo);
}

export function getBannerPhotoUrl(restaurant: IRestaurant): string {
  if (restaurant.bannerPhotoUrl) {
    return getMedUrl(restaurant.bannerPhotoUrl);
  } else {
    return getMainPhotoMedUrl(restaurant);
  }
}

export function getSmallBannerPhotoUrl(restaurant: IRestaurant): string {
  if (restaurant.bannerPhotoUrl) {
    return getThumbUrl(restaurant.bannerPhotoUrl);
  } else {
    return getMainPhotoThumbUrl(restaurant);
  }
}

export function fromExifData(url: string, exif: any): Photo {
  return { url };
}

export function toPhoto(photo: string | Photo): Photo {
  if (typeof photo === 'string') {
    return {
      url: photo
    };
  } else {
    return photo;
  }
}