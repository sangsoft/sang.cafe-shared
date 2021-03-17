export declare class IBillItem {
    description: string;
    planData: any;
    unitPrice: number;
    renewalAfterDays: number;
    quantity: number;
    planId: string;
    restaurantId?: string;
    brokerageValue?: number;
    contractId?: string;
    contractStatus?: string;
}
export declare class BillItem {
    description: string;
    planData: any;
    unitPrice: number;
    renewalAfterDays: number;
    quantity: number;
    planId: string;
    restaurantId?: string;
    brokerageValue?: number;
    contractId?: string;
    contractStatus?: string;
    constructor(obj: IBillItem);
}
