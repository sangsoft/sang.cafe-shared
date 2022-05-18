import { SerializedTimestamp } from '../helpers/times';
import { PavementStatus, StreetLaneType, StreetType } from './Restaurant';
import { IUser } from './User';
export declare enum ProjectStatus {
    PENDING = "pending",
    ONGOING = "ongoing",
    CLOSED = "closed"
}
export declare enum ProjectType {
    FIND_PREMISE = "find-premise"
}
export declare enum RelatedMemberType {
    ADMIN = "admin",
    CUSTOMER = "customer"
}
export interface IProjectRequirements {
    area: number[];
    numberOfFronts: number;
    pavementStatus: PavementStatus;
    streetType?: StreetType;
    streetLaneType?: StreetLaneType;
    priceRange: number[];
    monthlyRentalRange: number[];
    type: string[];
}
export interface IRelatedMember {
    member: Partial<IUser>;
    createPemission: boolean;
    type: RelatedMemberType;
    createdAt: SerializedTimestamp | Date | string;
    createdById: string;
}
export interface IProject {
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
    endedById?: string;
    status: ProjectStatus;
    type: ProjectType;
    customerCodeName: string;
    city?: string;
    districts: string[];
}
