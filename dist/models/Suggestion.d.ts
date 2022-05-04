import { SerializedTimestamp } from "../helpers/times";
export declare enum SuggestionStatus {
    ACTIVE = "active",
    OUTDATED = "outdated"
}
export interface SuggestionShortList {
    shortListedById: string;
    shortCode: string;
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
    projectId: string;
    oldSuggestionId: string | null;
    shortList: SuggestionShortList[];
}
