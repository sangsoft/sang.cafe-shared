import { SerializedTimestamp } from "../helpers/times";
export declare enum ProjectStatus {
    PENDING = "pending",
    ONGOING = "ongoing",
    CLOSED = "closed"
}
export declare enum ProjectType {
    FIND_PREMISE = "find-premise"
}
export interface IProject {
    name: string;
    code: string;
    customerName: string;
    customerId: string;
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
