import { SerializedTimestamp } from '../helpers/times';
export declare enum SuggestionStatus {
    ACTIVE = "active",
    OUTDATED = "outdated"
}
export interface SuggestionShortList {
    shortListedById: string;
    shortCode: string;
    createdAt: SerializedTimestamp;
}
export interface Remark {
    positive: string;
    negative: string;
}
export interface StaffRemark {
    shortCode: string;
    remark: Remark;
    createdById: string;
    createdAt: SerializedTimestamp;
}
export interface CustomerComment {
    shortList: string;
    comment: string;
    createdById: string;
    createdAt: SerializedTimestamp;
}
export interface ISuggestion {
    uid: string;
    customerCode: string;
    code: string;
    createdAt: SerializedTimestamp;
    shortCodes: string[];
    customerName: string;
    status: SuggestionStatus;
    createdById: string;
    createdBy: {
        displayName: string;
        phoneNumber: string;
    };
    staffRemarks: StaffRemark[];
    customerComments: CustomerComment[];
    projectId: string;
    oldSuggestionId: string | null;
    shortList: SuggestionShortList[];
}
