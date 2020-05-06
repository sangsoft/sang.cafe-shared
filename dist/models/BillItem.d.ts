export declare class IBillItem {
    description: string;
    planData: any;
    unitPrice: number;
    renewalAfterDays: number;
    quantity: number;
    planId: string;
    restaurantId?: string;
}
export declare class BillItem {
    description: string;
    planData: any;
    unitPrice: number;
    renewalAfterDays: number;
    quantity: number;
    planId: string;
    restaurantId?: string;
    constructor(obj: IBillItem);
}
