export interface IContract {
  uid: string,
  billId: string,
  customerId: string,
  itemId: number,
  agentId?: string,
  phoneNumber?: string,
  status: 'pending' | 'rejected' | 'confirmed',
  type: 'brokerage',
  createdAt: any,
  respondedAt: any,
}

export const ContractTypes = {
  BROKERAGE: 'brokerage',
};

export const ContractStatus = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  CONFIRMED: 'confirmed',
};