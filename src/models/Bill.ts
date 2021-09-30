import { BillItem } from "./BillItem";
import { Model } from "./Model";
import Joi from '@hapi/joi';

export enum BillStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  CONFIRMED = 'confirmed',
  BROKER_CONTRACT_PAID = 'broker-contract-paid',
  EXPIRED = 'expired',
  PARTIAL_PAID = 'partial-paid',
  TEMPORARY_CONFIRMED = 'temprorary-confirmed'
}

export interface IBill {
  items: BillItem[];
  uid?: string;
  createdAt?: any;
  billExpiredAfterMinutes?: number;
  status?: BillStatus;
  paid?: number;
  total: number;
  ownerId?: string;
  shortCode?: string;
  contractId?: string;
  contractStatus?: string;
}

export class Bill extends Model {
  public uid?: string;
  public items: BillItem[];
  public createdAt: any;
  public billExpiredAfterMinutes: number = 120;
  public status: BillStatus = BillStatus.PENDING;
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