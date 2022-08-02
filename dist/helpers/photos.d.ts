import type { Photo } from "../models/Photo";
import type { IRestaurant } from "../models/Restaurant";
export declare function moveMainPhotoFirst(photos: {
    main?: boolean;
}[]): {
    main?: boolean;
}[];
export declare function getUrl(photo: string | Photo): string;
export declare function getThumpObj(photo: string | Photo): string | Photo;
export declare function getMedObj(photo: string | Photo): string | Photo;
export declare function getMainPhotoObj(restaurant: IRestaurant): string | Photo;
export declare function getMainPhotoUrl(restaurant: IRestaurant): string;
export declare function getMainPhotoThumbUrl(restaurant: IRestaurant): string;
export declare function getThumbUrl(photo: string | Photo): string;
export declare function getMedUrl(photo: string | Photo): string;
export declare function getMainPhotoMedUrl(restaurant: IRestaurant): string;
export declare function getMainThumbHeight(restaurant: IRestaurant): number;
export declare function getPhotoCloudinaryPublicId(photo: string | Photo): string;
export declare function getBannerPhotoUrl(restaurant: IRestaurant): string;
export declare function getSmallBannerPhotoUrl(restaurant: IRestaurant): string;
export declare function fromExifData(url: string, exif: any): Photo;
export declare function toPhoto(photo: string | Photo): Photo;
