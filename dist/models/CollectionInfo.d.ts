import type * as admin from 'firebase-admin';
import type { SerializedTimestamp } from '../helpers/times';
import type { Model } from './Model';
import type { PavementStatus, RoadDirection, StreetLaneType, StreetType } from './Restaurant';
import type { IUser } from './User';
export declare enum CollectedInfoStatus {
    PENDING = "pending",
    REJECTED = "rejected",
    ACCEPTED = "accepted"
}
export declare enum CollectedInfoType {
    EMPTY_PREMISE = "empty-premise",
    RENT_DEMAND = "rent-demand"
}
export declare enum CollectedInfoRejectedReason {
    IMAGE_TOO_BLURRY = "image-too-blurry",
    DUPLICATED = "duplicated",
    CANNOT_CONTACT_OWNER = "cannot-contact-owner",
    PREMISE_DOES_NOT_MEET_REQUIREMENT = "premise-does-not-meet-requirement",
    PREMISE_DOES_NOT_MEET_PROJECT_REQUIREMENT = "premise-does-not-meet-project-requirement"
}
export interface CollectedInfoInput extends Model {
    address: string;
    city: string;
    district: string;
    infoImage: string;
    overallImage: string;
    phoneNumber?: string;
    customerName?: string;
    carLaneNumber: string;
    oneWayRoad: RoadDirection;
    hardSeparation: boolean;
    numberOfFronts: number;
    pavementStatus: PavementStatus;
    levels: number;
    totalLevels: number;
    canParkCar: boolean;
    streetType: StreetType;
    streetLaneType: StreetLaneType;
    missingPhoneNumber?: boolean;
    projectId?: string;
    extraPhoneNumbers?: string[];
    demandRequirements?: string;
    type: CollectedInfoType;
}
export interface CollectedInfo extends CollectedInfoInput {
    uid?: string;
    status: CollectedInfoStatus;
    createdBy: string;
    createdAt: admin.firestore.Timestamp | Date | SerializedTimestamp;
    rejectedReason: CollectedInfoRejectedReason;
    user?: IUser;
    originalPhoneNumber?: string;
    phoneNumber: string;
    note?: string;
    acceptedBy?: string;
    rejectedBy?: string;
}
