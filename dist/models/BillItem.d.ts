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
    proofUrl?: string;
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
    proofUrl?: string;
    constructor(obj: IBillItem);
}
