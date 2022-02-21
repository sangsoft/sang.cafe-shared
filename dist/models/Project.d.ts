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
    startDate: SerializedTimestamp;
    endDate?: SerializedTimestamp;
    createdAt: SerializedTimestamp;
    createdById: string;
    endedById: string;
    status: ProjectStatus;
    type: ProjectType;
}
