import { BillItem } from "./BillItem";
import { Model } from "./Model";
export interface IBill {
    items: BillItem[];
    uid?: string;
    createdAt?: any;
    billExpiredAfterMinutes?: number;
    status?: 'expired' | 'partial-paid' | 'paid' | 'pending';
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
    status: 'expired' | 'partial-paid' | 'paid' | 'pending';
    paid: number;
    total: number;
    ownerId?: string;
    shortCode?: string;
    contractId?: string;
    contractStatus?: string;
    constructor(obj: IBill);
    createSchema(): any;
    onPrepareData(): this;
}
