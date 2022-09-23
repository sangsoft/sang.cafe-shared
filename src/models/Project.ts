import type { SerializedTimestamp } from '../helpers/times';
import type { Model } from './Model';
import type { PavementStatus, StreetLaneType, StreetType } from './Restaurant';
import type { IRole } from './Role';
import type { IUser } from './User';

export enum ProjectStatus {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  CLOSED = 'closed',
}

export enum ProjectType {
  FIND_PREMISE = 'find-premise',
}

export enum RelatedMemberType {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface IProjectRequirements {
  type: string[];
  area: number[];
  totalArea: number[];
  priceRange: number[];
  monthlyRentalRange: number[];
  frontWidth: number[];
  levels: number[];
  numberOfFronts: number;
  pavementStatus: PavementStatus;
  streetType: StreetType[];
  streetLaneType: StreetLaneType[];
  tags: string[];
}

export interface IRelatedMember {
  member: Partial<IUser>;
  uid: string;
  projectId: string;
  projectRoles: IRole[];
  createPermission: boolean;
  type: RelatedMemberType;
  createdAt: SerializedTimestamp | Date | string;
  createdById: string;
}

export interface IProject extends Model {
  uid: string;
  name: string;
  code: string;
  customerName: string;
  customerId: string;
  requirements: IProjectRequirements;
  relatedMembers: IRelatedMember[];
  descriptionRequirement: string;
  descriptionCommission: string;
  startDate: SerializedTimestamp | Date | string;
  endDate?: SerializedTimestamp | Date | string;
  createdAt: SerializedTimestamp | Date | string;
  createdById: string;
  lastUpdatedAt: SerializedTimestamp | Date | string;
  endedById?: string;
  status: ProjectStatus;
  type: ProjectType;
  customerCodeName: string;
  city?: string;
  districts: string[];
}
