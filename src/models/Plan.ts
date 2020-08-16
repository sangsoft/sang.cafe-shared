import { isBefore, isAfter } from 'date-fns';
import { User } from './User';
import { Restaurant } from './Restaurant';

type SaleOffApplicationFn = (ctx: SaleOffContext, plan: Plan) => Plan;

export const FreeApplicationFn = (): SaleOffApplicationFn => (ctx: SaleOffContext, plan: Plan): Plan => {
  return new Plan({
    ...plan,
    price: 0,
    isSaleOff: true
  })
};

export const PercentDiscountApplicationFn = (percent: number): SaleOffApplicationFn => (ctx: SaleOffContext, plan: Plan): Plan => {
  return new Plan({
    ...plan,
    price: (100 - percent) * plan.price,
    isSaleOff: true
  })
};

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

export abstract class SaleOff implements ISaleOff {
  public from: Date;
  public to: Date;
  public description: string;
  public applicationFn: SaleOffApplicationFn;

  constructor(obj: ISaleOff, applicationFn: SaleOffApplicationFn) {
    Object.assign(this, obj);
    this.applicationFn = applicationFn;
  }

  abstract isApplicable(ctx: SaleOffContext): boolean;

  isWithinSaleOffDate(ctx: SaleOffContext): boolean {
    const now = new Date();
    return isAfter(now, this.from) && isBefore(now, this.to);
  }

  isViableForSaleOff(ctx: SaleOffContext) {
    if (!this.isWithinSaleOffDate(ctx)) {
      return;
    }

    return this.isApplicable(ctx);
  }

  applyOnly(ctx: SaleOffContext, plan: Plan): Plan {
    return this.applicationFn(ctx, plan);
  }

  apply(ctx: SaleOffContext, plan: Plan): Plan {
    if (!this.isViableForSaleOff(ctx)) {
      // Current context is not viable for saleoff
      return plan;
    }

    return this.applicationFn(ctx, plan);
  }
}

export interface ICheapRestaurantSaleOff extends SaleOff {
  threshold: number;
}

export class CheapRestaurantSaleOff extends SaleOff {
  public threshold: number;

  constructor(obj: ICheapRestaurantSaleOff, applicationFn: SaleOffApplicationFn) {
    super(obj, applicationFn);
    this.threshold = obj.threshold;
  }

  isApplicable({ restaurant }: SaleOffContext): boolean {
    return restaurant.price <= this.threshold;
  }
}

export class Plan {
  public name: string;
  public price: number;
  public type: string;
  public headerColor?: string;
  public headerTextColor?: string;
  public slug: string;
  public uid?: string;
  public period: number;
  public saleOffs?: SaleOff[];
  public actionBtn: any;
  public details: {
    text: string;
    available: boolean;
  }[];
  public isSaleOff: boolean = false;

  constructor(obj: IPlan) {
    Object.assign(this, obj);
  }

  findSaleOff(ctx: SaleOffContext): Plan {
    if (this.isSaleOff) {
      // This is already a saleoff brand, no more saleoff can be applied upon
      return this;
    }

    let saleOff = this.saleOffs.find((saleOff) => saleOff.isViableForSaleOff(ctx));
    if (!saleOff) {
      return this;
    }

    return saleOff.applyOnly(ctx, this);
  }
}