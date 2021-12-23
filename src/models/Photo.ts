import type { UploadApiResponse } from 'cloudinary';

export interface Photo {
  url: string;
  main?: boolean;
  fileName?: string;
  fileType?: string;
  dimensions?: {
    width: number;
    height: number;
  };
  sml?: Photo;
  med?: Photo;

  fileId?: string;
  bucketId?: string;

  gsPath?: string;

  externalPhoto?: Photo;

  cloudinary?: UploadApiResponse;
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