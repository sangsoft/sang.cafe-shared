export interface IContract {
    uid: string;
    billId: string;
    customerId: string;
    agentId?: string;
    phoneNumber?: string;
    status: 'pending' | 'rejected' | 'confirmed';
    type: 'brokerage';
}
export declare const ContractTypes: {
    BROKERAGE: string;
};
export declare const ContractStatus: {
    PENDING: string;
    REJECTED: string;
    CONFIRMED: string;
};
