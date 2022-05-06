export enum PredictionModelType {
  RENT_VALUE='rent-value',
  RENT_VALUE_HAN='rent-value-hanoi',
  RENT_VALUE_SGN='rent-value-hcmc',
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
  city?: string;
}

export interface IPredictionResult {
  modelId: string;
  prediction: {
    model: {
      feature_config_path: string;
      model_path: string;
      transformer_path: string;
    }
    results: ({
      prediction: {
        value: number;
        confident_range: number[];
      }
    } | {
      error: string
    })[]
  }
}

export interface IPredictionLog {
  uid: string;
  modelId: string;
  result: IPredictionResult;
  customerResponse: string;
  params: string;
}

