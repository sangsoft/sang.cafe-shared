import { Model } from "./Model";
import { IUser } from "./User";
import { IRestaurant } from "./Restaurant";
import { SearchMatch } from "./SearchMatch";
export declare enum TaskStatus {
    PENDING = "pending",
    ONGOING = "ongoing",
    COMPLETE = "complete",
    DEPOSITED = "deposited"
}
export declare enum TaskType {
    FILL_DATA = "fill-data",
    COMMUNICATE_BUYER = "communicate-buyer",
    BROKERAGE = "brokerage",
    CRAWLED_DATA = "crawled-data",
    POST_EXTENSION = "post-extension"
}
export declare enum TaskResult {
    DONE = "done",
    EXTENDS = "extends",
    CHANGE_TO_BROKERAGE = "change-to-brokerage",
    SOLD = "sold",
    EXTENSION_REJECTED = "extension-rejected",
    DATA_COMPLETED = "data-completed",
    SELLER_NOT_INTERESTED = "seller-not-interested",
    SELLER_ACCEPTED = "seller-accepted",
    SELLER_IS_BROKER = "is-broker",
    BUYER_NOT_INTERESTED = "buyer-not-interested",
    BUYER_CONSIDERING = "buyer-considering",
    DEAL_SUCCESS = "deal-success",
    DEAL_FAILED_BUYER_REJECT = "deal-failed-buyer-reject",
    DEAL_FAILED_SELLER_REJECT = "deal-failed-seller-reject"
}
export interface ITask {
    uid?: string;
    name: string;
    description: string;
    props?: string[];
    status: TaskStatus;
    type: TaskType;
    priority: number;
    assigneeId?: string;
    assignee?: IUser;
    restaurantId?: string;
    restaurant?: IRestaurant;
    buyerId?: string;
    buyer?: IUser;
    buyerRequirement?: string;
    sellerId?: string;
    seller?: IUser;
    sellerRequirement?: string;
    agentId?: string;
    agent?: IUser;
    createdById?: String;
    createdBy?: IUser;
    result?: TaskResult;
    appointment?: Date[];
    match?: SearchMatch;
}
export declare class Task extends Model {
    uid?: string;
    name: string;
    description: string;
    createdAt: any;
    updatedAt: any;
    props?: string[];
    status: TaskStatus;
    type: TaskType;
    priority: number;
    assigneeId?: string;
    assignee?: IUser;
    restaurantId?: string;
    restaurant?: IRestaurant;
    buyerId?: string;
    buyer?: IUser;
    buyerRequirement?: string;
    sellerId?: string;
    seller?: IUser;
    sellerRequirement?: string;
    agentId?: string;
    agent?: IUser;
    createdById?: String;
    createdBy?: IUser;
    result?: TaskResult;
    appointment?: Date[];
    match?: SearchMatch;
    constructor(obj?: ITask);
    createSchema(): any;
    onPrepareData(): any;
}
