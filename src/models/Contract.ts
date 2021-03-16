export interface IContract {
  uid: string,
  billId: string,
  customerId: string,
  agentId?: string,
  phoneNumber?: string,
  status: 'pending' | 'rejected' | 'confirmed',
  type: 'brokerage'
}

export const ContractTypes = {
  BROKERAGE: 'brokerage',
};

export const ContractStatus = {
  PENDING: 'pending',
  REJECTED: 'rejected',
  CONFIRMED: 'confirmed',
};