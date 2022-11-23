import { Model } from './Model';
import type { Photo } from './Photo';
import { SearchRecord } from './SearchRecord';
import { NearByResult } from './Geo';
import { SerializedTimestamp } from '../helpers/times';
import { Video } from './Video';
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
    WITH_1_LANE = "1-lane",
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
export interface IRestaurant extends Model {
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
    videos?: Video[];
    propertyDesignPhotos?: Photo[];
    name: string;
    title?: string;
    description: string;
    price: number;
    type: string;
    address: string;
    city: string;
    district: string;
    area: number;
    landArea?: number;
    frontWidth: number;
    shortCode?: string;
    createdById?: string;
    numberOfFronts?: number;
    depth?: number;
    monthlyRent?: number;
    contractTimeLeft?: number;
    levels?: number;
    totalLevels?: number;
    totalBasements?: number;
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
    missingPrivateContactInfo?: boolean;
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
export interface IInfoRequest extends Model {
    restaurantId: string;
    name: string;
    phoneNumber: string;
    message: string;
}
