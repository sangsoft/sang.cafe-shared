import { User } from './User';
import { Restaurant } from './Restaurant';
declare type SaleOffApplicationFn = (ctx: SaleOffContext, plan: Plan) => Plan;
export declare const FreeApplicationFn: () => SaleOffApplicationFn;
export declare const PercentDiscountApplicationFn: (percent: number) => SaleOffApplicationFn;
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
    saleOffs?: SaleOff[];
    isSaleOff?: boolean;
}
export interface ISaleOff {
    from: Date;
    to: Date;
    description: string;
}
export interface SaleOffContext {
    user: User;
    restaurant: Restaurant;
}
export declare abstract class SaleOff implements ISaleOff {
    from: Date;
    to: Date;
    description: string;
    applicationFn: SaleOffApplicationFn;
    constructor(obj: ISaleOff, applicationFn: SaleOffApplicationFn);
    abstract isApplicable(ctx: SaleOffContext): boolean;
    isWithinSaleOffDate(ctx: SaleOffContext): boolean;
    isViableForSaleOff(ctx: SaleOffContext): boolean;
    applyOnly(ctx: SaleOffContext, plan: Plan): Plan;
    apply(ctx: SaleOffContext, plan: Plan): Plan;
}
export interface ICheapRestaurantSaleOff extends ISaleOff {
    threshold: number;
}
export declare class CheapRestaurantSaleOff extends SaleOff {
    threshold: number;
    constructor(obj: ICheapRestaurantSaleOff, applicationFn: SaleOffApplicationFn);
    isApplicable({ restaurant }: SaleOffContext): boolean;
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
    saleOffs?: SaleOff[];
    actionBtn: any;
    details: {
        text: string;
        available: boolean;
    }[];
    isSaleOff: boolean;
    constructor(obj: IPlan);
    findSaleOff(ctx: SaleOffContext): Plan;
}
export {};
