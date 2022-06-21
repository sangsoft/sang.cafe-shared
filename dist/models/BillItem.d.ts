export declare class IBillItem {
    description: string;
    planData: any;
    unitPrice: number;
    renewalAfterDays: number;
    quantity: number;
    planId: string;
    restaurantId?: string;
    brokerageValue?: number;
    brokerageThreshold?: string;
    brokerageThresholdType?: string;
    brokerageValueFull?: {
        quick?: number;
        slow?: number;
    };
    contractId?: string;
    contractStatus?: string;
    proofUrl?: string;
}
