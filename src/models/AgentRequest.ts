
export interface IAgentRequest {
  name: string;
  typeOfID: string;
  portrait: string;
  idFront: string;
  idBack: string;
  operationAreas: { district: string, city: string }[]
  policy: string;
  bank: string;
  account: string;
  accountName: string;
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
