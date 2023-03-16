import type { Model } from './Model';
import type { IUser } from './User';
import type { IInfoRequest, IRestaurant } from './Restaurant';
import type { SearchMatch } from './SearchMatch';
import type { SerializedTimestamp } from '../helpers/times';
import type { CollectedInfo } from './CollectionInfo';
export declare enum TaskStatus {
    PENDING = "pending",
    ONGOING = "ongoing",
    COMPLETE = "complete",
    DEPOSITED = "deposited",
    DELEGATED = "delegated",
    OUT_OF_DATE = "out-of-date",
    BILL_CREATED = "bill-created",
    CANNOT_CONTACT_OWNER = "cannot-contact-owner",
    NEED_ID_NUMBER = "need-id-number",
    ID_NUMBER_PROVIDED = "id-number-provided",
    OWNER_FOUND = "owner-found"
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
    HANDLE_COLLECTED_INFO_MISSING_PHONE = "handle-collected-info-missing-phone",
    HANDLE_COLLECTED_INFO_RENT_DEMAND = "handle-collected-info-rent-demand",
    CONTACT_INFORMATION_REQUEST = "contact-information-request",
    FIND_PREMISE_OWNER = "find-premise-owner"
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
    infoRequestId?: string;
    infoRequest?: Partial<IInfoRequest>;
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
    callLogs?: TaskCallLog[];
    idNumberDetail?: string;
    hasDetail?: boolean;
    idNumberProviderId?: string;
    needIdNumber?: boolean;
    markedNeededIdNumberBy?: string;
    markedNeededIdNumberAt?: Date | SerializedTimestamp;
    foundOwnerId?: string;
    foundOwnerPhoneNumber: string;
    ownerFoundBy?: string;
    ownerFoundAt: Date | SerializedTimestamp;
}
export declare enum CannotCallReason {
    LINE_BUSY = "line-busy",
    DID_NOT_PICKUP = "did-not-pickup",
    WRONG_NUMBER = "wrong-number",
    PHONE_OFF = "phone-off"
}
export declare enum TaskCallLogStatus {
    CANNOT_CONTACT_OWNER = "cannot-contact-owner",
    CALL_THROUGH = "call-through",
    CALL_THROUGH_NEED_CALL_BACK = "call-through-need-call-back"
}
export interface TaskCallLog extends Model {
    status: TaskCallLogStatus;
    createdBy: Partial<IUser>;
    createdById: string;
    calledPhoneNumber?: string;
    reason: CannotCallReason;
}
