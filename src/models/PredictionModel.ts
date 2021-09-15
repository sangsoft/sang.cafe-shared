export enum PredictionModelType {
  RENT_VALUE='rent-value',
}

export enum PredictionModelStatus {
  ACTIVE='active',
  DEACTIVE='deactive',
  ERROR='error',
}

export interface IPredictionModel {
  uid: string;
  type: PredictionModelType;
  uploadedUrl: string;
  status: PredictionModelStatus;
  createdAt: any;
  createdBy: string;
  testDeployedAt: any;
  testDeploymentStatus: 'pending' | 'deployed' | 'waiting' | 'removed';
  deployedAt: any;
  deploymentStatus:  'pending' | 'deployed' | 'waiting' | 'removed';
  modelUri: string;
  transformerUri: string;
  deactivatedBy: string;
  deactivatedAt: any;
  activatedBy: string;
  activatedAt: string;
}

export interface IPredictionResult {

}

export interface IPredictionLog {
  uid: string;
  modelId: string;
  result: IPredictionResult;
  customerResponse: string;
  params: string;
}
