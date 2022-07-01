import type { Model } from "./Model";
import type { IUser } from "./User";
import type { IRestaurant } from "./Restaurant";
import type { SearchMatch } from "./SearchMatch";
import type { SerializedTimestamp } from "../helpers/times";
import type { CollectedInfo } from './CollectionInfo';
export declare enum TaskStatus {
    PENDING = "pending",
    ONGOING = "ongoing",
    COMPLETE = "complete",
    DEPOSITED = "deposited",
    DELEGATED = "delegated",
    OUT_OF_DATE = "out-of-date",
    BILL_CREATED = "bill-created",
    CANNOT_CONTACT_OWNER = "cannot-contact-owner"
}
export declare enum TaskType {
    FILL_DATA = "fill-data",
    FINALIZE_POST = "finalize-post",
    FINALIZE_OLD_POST = "finalize-old-post",
    COMMUNICATE_BUYER = "communicate-buyer",
    BROKERAGE = "brokerage",
    CRAWLED_DATA = "crawled-data",
    POST_EXTENSION = "post-extension",
    HANDLE_COLLECTED_INFO = "handle-collected-info",
    HANDLE_COLLECTED_INFO_MISSING_PHONE = "handle-collected-info-missing-phone"
}
export declare enum TaskResult {
    DONE = "done",
    DATA_COLLECTED_NOT_SATISFIED = "data-collected-not-satisfied",
    DATA_DUPLICATED = "data-duplicated",
    EXTENDS = "extends",
    CHANGE_TO_BROKERAGE = "change-to-brokerage",
    SOLD = "sold",
    EXTENSION_REJECTED = "extension-rejected",
    DATA_COMPLETED = "data-completed",
    SELLER_NOT_INTERESTED = "seller-not-interested",
    SELLER_ACCEPTED = "seller-accepted",
    SELLER_IS_BROKER = "is-broker",
    POST_NOT_COMPATIBLE = "post-not-compatible",
    FOR_SALE_PRICE_TOO_LOW = "for-sale-price-too-low",
    RENTAL_PRICE_TOO_LOW = "rental-price-too-low",
    COULDNT_CONTACT = "couldnt-contact",
    OLD_CUSTOMER_ACCEPTED = "old-customer-accepted",
    DUPLICATED = "deplicated",
    BUYER_NOT_INTERESTED = "buyer-not-interested",
    BUYER_CONSIDERING = "buyer-considering",
    DEAL_SUCCESS = "deal-success",
    DEAL_FAILED_BUYER_REJECT = "deal-failed-buyer-reject",
    DEAL_FAILED_SELLER_REJECT = "deal-failed-seller-reject"
}
export interface ITask extends Model {
    uid?: string;
    name: string;
    description: string;
    props?: string[];
    status: TaskStatus;
    type: TaskType;
    priority: number;
    assigneeId?: string;
    assignee?: IUser;
    assignedById?: string;
    assignedBy?: IUser;
    delegatedById?: string;
    delegatedBy?: IUser;
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
    createdById?: string;
    createdBy?: IUser;
    completedUserId?: string;
    completedAt?: Date | SerializedTimestamp;
    result?: TaskResult;
    appointment?: Date[];
    location?: string[];
    match?: SearchMatch;
    infoId?: string;
    info?: Partial<CollectedInfo>;
    hidden?: string;
    city?: string | null;
    district?: string | null;
    assigneeHistory?: string[];
    projectId?: string;
    ownerContactedTimes?: (Date | SerializedTimestamp)[];
    ownerContactedUsers?: Partial<IUser>[];
    ownerContactedUserIds?: string[];
    lastCannotContactedAt?: Date | SerializedTimestamp;
    lastCannotContactedUserId?: string;
    lastCannotContactedUser?: Partial<IUser>;
}
