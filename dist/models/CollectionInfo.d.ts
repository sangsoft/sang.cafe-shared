import * as admin from 'firebase-admin';
import { SerializedTimestamp } from '../helpers/times';
import { PavementStatus, RoadDirection, StreetLaneType, StreetType } from './Restaurant';
import { User } from './User';
export declare enum CollectedInfoStatus {
    PENDING = "pending",
    REJECTED = "rejected",
    ACCEPTED = "accepted"
}
export declare enum CollectedInfoRejectedReason {
    IMAGE_TOO_BLURRY = "image-too-blurry",
    DUPLICATED = "duplicated",
    CANNOT_CONTACT_OWNER = "cannot-contact-owner",
    PREMISE_DOES_NOT_MEET_REQUIREMENT = "premise-does-not-meet-requirement"
}
export interface CollectedInfoInput {
    address: string;
    city: string;
    district: string;
    infoImage: string;
    overallImage: string;
    phoneNumber: string;
    carLaneNumber: string;
    oneWayRoad: RoadDirection;
    hardSeparation: boolean;
    numberOfFronts: number;
    pavementStatus: PavementStatus;
    levels: number;
    canParkCar: boolean;
    streetType: StreetType;
    streetLaneType: StreetLaneType;
    missingPhoneNumber?: boolean;
    projectId?: string;
}
export interface CollectedInfo extends CollectedInfoInput {
    uid?: string;
    status: CollectedInfoStatus;
    createdBy: string;
    createdAt: admin.firestore.Timestamp | Date | SerializedTimestamp;
    rejectedReason: CollectedInfoRejectedReason;
    user?: User;
    originalPhoneNumber?: string;
    phoneNumber: string;
    note?: string;
    acceptedBy?: string;
    rejectedBy?: string;
}
