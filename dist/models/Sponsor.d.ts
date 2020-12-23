export interface ISponsor {
    uid?: string;
    billId: string;
    createdAt: any;
    expiredAt: any;
    level: number;
    pickCount: number;
    planId: string;
    restaurantId: string;
    disabled: boolean;
}
