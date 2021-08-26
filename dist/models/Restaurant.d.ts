import { Model } from "./Model";
import { Photo } from "./Photo";
import { SearchRecord } from "./SearchRecord";
export interface CrawledSeed {
    city?: string;
    mix?: boolean;
    type?: string;
    url: string;
}
export interface CrawledSource {
    address?: string;
    type?: string;
    url: string;
    seed: CrawledSeed;
}
export interface IRestaurant {
    uid?: string;
    place?: any;
    saved?: boolean;
    ownerId: string;
    createdAt?: any;
    approved?: boolean;
    sold?: boolean;
    doc?: any;
    ad?: boolean;
    slug?: string;
    photos: (string | Photo)[];
    name: string;
    title?: string;
    description: string;
    price: number;
    type: string;
    address: string;
    city: string;
    district: string;
    area: number;
    frontWidth: number;
    shortCode?: string;
    createdById?: string;
    numberOfFronts?: number;
    depth?: number;
    monthlyRent?: number;
    contractTimeLeft?: number;
    levels?: number;
    contractEnd?: {
        month: number;
        year: number;
    };
    minimalContractTime?: number;
    contact: string;
    contactPerson: string;
    landOwnerPhoneNumber?: string;
    since?: number | {
        month: number;
        year: number;
    };
    revenue: number;
    grossProfit: number;
    menuPhotoUrl: string | Photo;
    bannerPhotoUrl?: string | Photo;
    businessLicensePhotoUrl: string | Photo;
    employeeCount: number;
    hasPos: boolean;
    hasLivingSpace: boolean;
    show?: boolean;
    imageResized?: boolean;
    matches?: {
        fieldMatchingCount: number;
        fields: string[];
        search: SearchRecord;
    }[];
    privateAddress?: string;
    privateContact?: string;
    privateContactPerson?: string;
    brokerage?: boolean;
    transactionInformation?: {
        buyerPhoneNumber?: string;
        transactionChannel?: string;
        transactionDate?: Date;
        transactionValue?: number;
    };
    source?: CrawledSource;
    status: string;
}
export declare class Restaurant extends Model {
    name: string;
    title?: string;
    description: string;
    price: number;
    contact: string;
    contactPerson: string;
    type: string;
    photos: (string | Photo)[];
    uid?: string;
    place?: any;
    address: string;
    city: string;
    district: string;
    saved?: boolean;
    ownerId: string;
    createdAt?: any;
    approved: boolean;
    sold: boolean;
    doc?: any;
    since?: number | {
        month: number;
        year: number;
    };
    revenue: number;
    grossProfit: number;
    menuPhotoUrl: string | Photo;
    businessLicensePhotoUrl: string | Photo;
    employeeCount: number;
    hasPos?: boolean;
    hasLivingSpace?: boolean;
    ad: boolean;
    show: boolean;
    area: number;
    frontWidth: number;
    imageResized?: boolean;
    bannerPhotoUrl?: string | Photo;
    slug?: string;
    shortCode?: string;
    createdById?: string;
    numberOfFronts?: number;
    depth?: number;
    landOwnerPhoneNumber?: string;
    monthlyRent?: number;
    contractTimeLeft?: number;
    contractEnd?: {
        month: number;
        year: number;
    };
    minimalContractTime?: number;
    levels?: number;
    matches?: {
        fieldMatchingCount: number;
        fields: string[];
        search: SearchRecord;
    }[];
    privateAddress?: string;
    privateContact?: string;
    privateContactPerson?: string;
    brokerage?: boolean;
    transactionInformation?: {
        buyerPhoneNumber?: string;
        transactionChannel?: string;
        transactionDate?: Date;
        transactionValue?: number;
    };
    source?: CrawledSource;
    status: string;
    constructor(obj?: IRestaurant);
    getThumpObj(photo: string | Photo): string | Photo;
    getMedObj(photo: string | Photo): string | Photo;
    getMainPhotoObj(): string | Photo;
    getMainPhotoUrl(): string;
    getMainPhotoThumbUrl(): string;
    getThumbUrl(photo: string | Photo): string;
    getMedUrl(photo: string | Photo): string;
    getMainPhotoMedUrl(): string;
    getMainThumbHeight(): number;
    getBannerPhotoUrl(): string;
    getSmallBannerPhotoUrl(): string;
    createSchema(): any;
    onPrepareData(): any;
}
