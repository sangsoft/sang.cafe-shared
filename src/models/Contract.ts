import type { Model } from "./Model";

export interface IContract extends Model {
  uid: string,
  billPath: string,
  billId: string,
  customerId: string,
  itemId: number,
  agentId?: string,
  phoneNumber?: string,
  status: 'pending' | 'rejected' | 'confirmed',
  type: 'brokerage',
  createdAt: any,
  respondedAt: any,
  proofUrl: string,
}

export const ContractTypes = {
  BROKERAGE: 'brokerage',
};

export const ContractStatus = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  CONFIRMED: 'confirmed',
  PROOF_BYPASSED: 'proof_bypassed'
};