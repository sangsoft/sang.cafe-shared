import type { Model } from "./Model";

export interface IAgentRequest extends Model {
  uid: string;
  name: string;
  typeOfID: string;
  portrait: string;
  idFront: string;
  idBack: string;
  idNumber: string;
  operationAreas: { district: string, city: string }[]
  policy: string;
  bank: string;
  account: string;
  accountName: string;
  createdAt: any;
  rejectedAt: any;
  approvedAt: any;
  status: AgentRequestStatus;
  phoneNumber: string;
  email?: string;
  approvedBy: string;
  rejactedBy: string;
  rejectedReason: string;
  positions?: string[];
  directReview?: boolean;
  userId: string;
}

export const IDTypeText = {
  'cccd': 'Căn cước công dân/Chứng minh nhân dân',
  'passport': 'Hộ chiếu',
  'driving_license': 'Giấy phép lái xe',
};

export const CompensationModel = {
  'fee-based': 'Mô hình phí',
  'commission-based': 'Mô hình hoa hồng',
};

export enum AgentRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  UNDERGOING = 'undergoing',
}