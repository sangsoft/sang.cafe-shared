import type { Model } from "./Model";
export interface IContract extends Model {
    uid: string;
    billPath: string;
    billId: string;
    customerId: string;
    itemId: number;
    agentId?: string;
    phoneNumber?: string;
    status: 'pending' | 'rejected' | 'confirmed';
    type: 'brokerage';
    createdAt: any;
    respondedAt: any;
    proofUrl: string;
}
export declare const ContractTypes: {
    BROKERAGE: string;
};
export declare const ContractStatus: {
    PENDING: string;
    REJECTED: string;
    CONFIRMED: string;
    PROOF_BYPASSED: string;
};
