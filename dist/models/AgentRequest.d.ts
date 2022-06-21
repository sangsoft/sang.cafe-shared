import type { Model } from "./Model";
export interface IAgentRequest extends Model {
    uid: string;
    name: string;
    typeOfID: string;
    portrait: string;
    idFront: string;
    idBack: string;
    idNumber: string;
    operationAreas: {
        district: string;
        city: string;
    }[];
    policy: string;
    bank: string;
    account: string;
    accountName: string;
    createdAt: any;
    rejectedAt: any;
    approvedAt: any;
    status: AgentRequestStatus;
    phoneNumber: string;
    email?: string;
    approvedBy: string;
    rejactedBy: string;
    rejectedReason: string;
    positions?: string[];
    directReview?: boolean;
    userId: string;
}
export declare const IDTypeText: {
    cccd: string;
    passport: string;
    driving_license: string;
};
export declare const CompensationModel: {
    'fee-based': string;
    'commission-based': string;
};
export declare enum AgentRequestStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected",
    UNDERGOING = "undergoing"
}
