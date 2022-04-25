import { BillItem } from "./BillItem";
import { Model } from "./Model";
import { SerializedTimestamp } from "../helpers/times";
export declare enum BillStatus {
    PENDING = "pending",
    PAID = "paid",
    CANCELLED = "cancelled",
    CONFIRMED = "confirmed",
    BROKER_CONTRACT_PAID = "broker-contract-paid",
    EXPIRED = "expired",
    PARTIAL_PAID = "partial-paid",
    TEMPORARY_CONFIRMED = "temprorary-confirmed"
}
export interface IBill {
    items: BillItem[];
    uid?: string;
    createdAt?: any;
    billExpiredAfterMinutes?: number;
    status?: BillStatus;
    paid?: number;
    total: number;
    ownerId?: string;
    shortCode?: string;
    contractId?: string;
    contractStatus?: string;
    restaurantId?: string;
    restaurantIds?: string[];
    restaurantTaskId?: string;
    restaurantTaskIds?: string[];
    statusUpdatedBy?: string;
    statusUpdatedAt?: SerializedTimestamp | Date;
}
export declare class Bill extends Model {
    uid?: string;
    items: BillItem[];
    createdAt: any;
    billExpiredAfterMinutes: number;
    status: BillStatus;
    paid: number;
    total: number;
    ownerId?: string;
    shortCode?: string;
    statusUpdatedBy?: string;
    statusUpdatedAt?: SerializedTimestamp | Date;
    restaurantId?: string;
    restaurantIds?: string[];
    restaurantTaskId?: string;
    restaurantTaskIds?: string[];
    constructor(obj: IBill);
    createSchema(): any;
    onPrepareData(): this;
}
