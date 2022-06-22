import type { IBillItem } from "./BillItem";
import type { Model } from "./Model";
import type { SerializedTimestamp } from "../helpers/times";

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

export interface IBill extends Model {
  items: IBillItem[];
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
  restaurantId?: string;
  restaurantIds?: string[];
  restaurantTaskId?: string;
  restaurantTaskIds?: string[];
  statusUpdatedBy?: string;
  statusUpdatedAt?: SerializedTimestamp | Date;
}