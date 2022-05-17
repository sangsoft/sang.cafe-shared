import { SerializedTimestamp } from '../helpers/times';
import { IUser } from './User';

export enum ProjectStatus {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  CLOSED = 'closed',
}

export enum ProjectType {
  FIND_PREMISE = 'find-premise',
}

export enum RelatedAdminType {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface IProjectRequirements {
  priceRange: number[];
  monthlyRentalRange: number[];
  type: string[];
}
export interface IRelatedAdmins {
  admin: Partial<IUser>;
  createPemission: boolean;
  type: RelatedAdminType;
  createdAt: SerializedTimestamp | Date | string;
  createdById: string;
}

export interface IProject {
  name: string;
  code: string;
  customerName: string;
  customerId: string;
  requirements: IProjectRequirements;
  relatedAdmins: IRelatedAdmins[];
  descriptionRequirement: string;
  descriptionCommission: string;
  startDate: SerializedTimestamp | Date | string;
  endDate?: SerializedTimestamp | Date | string;
  createdAt: SerializedTimestamp | Date | string;
  createdById: string;
  endedById?: string;
  status: ProjectStatus;
  type: ProjectType;
  customerCodeName: string;
  city?: string;
  districts: string[];
}
