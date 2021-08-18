import { BillItem } from "./BillItem";
import { Model } from "./Model";
export declare enum BillStatus {
    PENDING = "pending",
    PAID = "paid",
    CANCELLED = "cancelled",
    CONFIRMED = "confirmed",
    BROKER_CONTRACT_PAID = "broker-contract-paid",
    EXPIRED = "expired",
    PARTIAL_PAID = "partial-paid"
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
    constructor(obj: IBill);
    createSchema(): any;
    onPrepareData(): this;
}
