import { Model } from "./Model";
import { IUser } from "./User";
export declare enum TaskStatus {
    PENDING = "pending",
    ONGOING = "ongoing",
    COMPLETE = "complete"
}
export declare enum TaskType {
    FILL_DATA = "fill-data",
    COMMUNICATE_BUYER = "communicate-buyer",
    BROKERAGE = "brokerage"
}
export declare enum TaskResult {
    DONE = "done",
    DATA_COMPLETED = "data-completed",
    BUYER_NOT_INTERESTED = "buyer-not-interested",
    BUYER_CONSIDERING = "buyer-considering",
    DEAL_SUCCESS = "deal-success",
    DEAL_FAILED_BUYER_REJECT = "deal-failed-buyer-reject",
    DEAL_FAILED_SELLER_REJECT = "deal-failed-seller-reject"
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
    priority: number;
    assignee?: IUser;
    seller?: IUser;
    buyer?: IUser;
    result?: TaskResult;
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
    priority: number;
    assignee?: IUser;
    seller?: IUser;
    buyer?: IUser;
    agent?: IUser;
    result?: TaskResult;
    constructor(obj?: ITask);
    createSchema(): any;
    onPrepareData(): any;
}
