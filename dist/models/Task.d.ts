import { Model } from "./Model";
export declare enum TaskStatus {
    PENDING = "pending",
    ONGOING = "ongoing",
    COMPLETE = "complete"
}
export declare enum TaskType {
    FILL_DATA = "fill-data",
    COMMUNICATE_BUYER = "communicate-buyer"
}
export interface ITaskNote {
    ownerId: string;
    content: string;
}
export interface ITask {
    uid?: string;
    name: string;
    description: string;
    restaurantId?: string;
    assigneeId?: string;
    props?: string[];
    notes?: ITaskNote[];
    status: TaskStatus;
    type: TaskType;
}
export declare class Task extends Model {
    uid?: string;
    name: string;
    description: string;
    restaurantId?: string;
    assigneeId?: string;
    props?: string[];
    notes?: ITaskNote[];
    status: TaskStatus;
    createdAt: any;
    updatedAt: any;
    type: TaskType;
    constructor(obj?: ITask);
    createSchema(): any;
    onPrepareData(): any;
}
