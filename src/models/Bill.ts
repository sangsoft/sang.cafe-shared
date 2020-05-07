import { BillItem } from "./BillItem";
import { Model } from "./Model";
import Joi from '@hapi/joi';

export interface IBill {
  items: BillItem[];
  uid?: string;
  createdAt?: any;
  billExpiredAfterMinutes?: number;
  status?: 'expired' | 'partial-paid' | 'paid' | 'pending';
  paid?: number;
  total: number;
  ownerId?: string;
  shortCode?: string;
}

export class Bill extends Model {
  public uid?: string;
  public items: BillItem[];
  public createdAt: any;
  public billExpiredAfterMinutes: number = 120;
  public status: 'expired' | 'partial-paid' | 'paid' | 'pending' = 'pending';
  public paid: number = 0;
  public total: number;
  public ownerId?: string;
  public shortCode?: string;

  constructor(obj: IBill) {
    super();
    Object.assign(this, obj);
  }

  createSchema() {
    return Joi.object({});
  }

  onPrepareData() {
    let obj = {
      ...this
    }

    delete obj.createdAt;
    delete obj.uid;

    return obj;
  }
}