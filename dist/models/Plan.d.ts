export interface IPlan {
    name: string;
    price: number;
    type: string;
    headerColor?: string;
    headerTextColor?: string;
    actionBtn: any;
    details: {
        text: string;
        available: boolean;
    }[];
    slug: string;
    uid?: string;
    period: number;
}
export declare class Plan {
    name: string;
    price: number;
    type: string;
    headerColor?: string;
    headerTextColor?: string;
    slug: string;
    uid?: string;
    period: number;
    actionBtn: any;
    details: {
        text: string;
        available: boolean;
    }[];
    constructor(obj: IPlan);
}
