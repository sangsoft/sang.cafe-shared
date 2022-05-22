import { Model } from './Model';
import { Photo } from './Photo';
import { SearchRecord } from './SearchRecord';
import { NearByResult } from './Geo';
import { SerializedTimestamp } from '../helpers/times';
export declare enum PavementStatus {
    PAVEMENT_WITH_MOTORBIKE_PARKING = "pavement-with-motorbike-parking",
    PAVEMENT_WITHOUT_MOTORBIKE_PARKING = "pavement-without-parking",
    NO_PAVEMENT = "no-pavement",
    PAVEMENT_SMALLER_THAN_3M = "pavement-smaller-than-3m",
    PAVEMENT_3_6M = "pavement-3-6m",
    PAVEMENT_LARGER_THAN_6M = "pavement-larger-than-6m"
}
export declare enum StreetType {
    ALLEYWAY_ONLY_MOTORBIKE = "alleyway-only-motorbike",
    ALLEYWAY_CAR_CAN_ENTER = "alleyway-car-can-enter",
    STREET_1_WAY = "street-1-way",
    STREET_2_WAY_NO_SEPARATION = "street-2-way-no-separation",
    STREET_2_WAY_WITH_HARD_SEPARATION = "street-2-way-with-hard-separation"
}
export declare enum StreetLaneType {
    WITH_2_LANE = "2-lane",
    WITH_4_LANE = "4-lane",
    WITH_6_LANE = "6-lane",
    MORE_THAN_6_LANE = "more-than-6-lane"
}
export declare enum RoadDirection {
    ONE_WAY_ROAD = "one-way-road",
    TWO_WAY_ROAD = "two-way-road"
}
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
export interface IPost {
    uid?: string;
    createdAt: Date | SerializedTimestamp;
    slug: string;
    restaurantId: string;
    monthlyRent: number;
    currentBusinessType: string;
    levels: number;
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
    photos: Photo[];
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
    totalLevels?: number;
    availableLevels?: number[];
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
    revenue?: number;
    grossProfit?: number;
    menuPhotoUrl: string | Photo;
    bannerPhotoUrl?: string | Photo;
    businessLicensePhotoUrl: string | Photo;
    employeeCount: number;
    hasPos?: boolean;
    hasLivingSpace?: boolean;
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
    temporaryBrokerage?: boolean;
    temporaryBillId?: string;
    temporaryBillShortcode?: string;
    status: string;
    tags?: string[];
    tagsDetail?: {
        [keys: string]: NearByResult[];
    };
    taggedAt?: any;
    geotagged?: boolean;
    taskId?: string;
    infoId?: string;
    carLaneNumber?: string;
    oneWayRoad?: RoadDirection;
    hardSeparation?: boolean;
    pavementStatus?: PavementStatus;
    canParkCar?: boolean;
    streetType?: StreetType;
    streetLaneType?: StreetLaneType;
    postId?: string;
    post?: IPost;
    lastPostPath?: string;
    lastPostId?: string;
    collectedInfoNote?: string;
}
export declare class Restaurant extends Model {
    name: string;
    title?: string;
    description: string;
    price: number;
    contact: string;
    contactPerson: string;
    type: string;
    photos: Photo[];
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
    revenue?: number;
    grossProfit?: number;
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
    temporaryBrokerage?: boolean;
    temporaryBillId?: string;
    temporaryBillShortcode?: string;
    landOwnerPhoneNumber?: string;
    monthlyRent?: number;
    contractTimeLeft?: number;
    contractEnd?: {
        month: number;
        year: number;
    };
    minimalContractTime?: number;
    levels?: number;
    totalLevels?: number;
    availableLevels?: number[];
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
    tags?: string[];
    tagsDetail?: {
        [keys: string]: NearByResult[];
    };
    taggedAt?: any;
    geotagged?: boolean;
    taskId?: string;
    infoId?: string;
    carLaneNumber?: string;
    oneWayRoad?: RoadDirection;
    hardSeparation?: boolean;
    pavementStatus?: PavementStatus;
    canParkCar?: boolean;
    streetType?: StreetType;
    streetLaneType?: StreetLaneType;
    postId?: string;
    post?: IPost;
    lastPostPath?: string;
    lastPostId?: string;
    collectedInfoNote?: string;
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
    getPhotoCloudinaryPublicId(photo: string | Photo): string;
    getBannerPhotoUrl(): string;
    getSmallBannerPhotoUrl(): string;
    createSchema(): any;
    onPrepareData(): any;
}
