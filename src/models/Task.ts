import { Model } from "./Model";
import Joi from '@hapi/joi';
import { IUser } from "./User";
import { IRestaurant } from "./Restaurant";

export enum TaskStatus {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  COMPLETE = 'complete',
}

export enum TaskType {
  FILL_DATA = 'fill-data',
  COMMUNICATE_BUYER = 'communicate-buyer',
  BROKERAGE = 'brokerage',
}

export enum TaskResult {
  DONE = 'done',
  // fill-data
  DATA_COMPLETED = 'data-completed',

  // communicate-buyer
  BUYER_NOT_INTERESTED = 'buyer-not-interested',
  BUYER_CONSIDERING = 'buyer-considering',

  // brokerage
  DEAL_SUCCESS = 'deal-success',
  DEAL_FAILED_BUYER_REJECT = 'deal-failed-buyer-reject',
  DEAL_FAILED_SELLER_REJECT = 'deal-failed-seller-reject',
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
  buyerRequirement?: string

  sellerId?: string;
  seller?: IUser;
  sellerRequirement?: string

  agentId?: string;
  agent?: IUser;

  createdById?: String;
  createdBy?: IUser;

  result?: TaskResult;

  appoinment?: Date[];
}
export class Task extends Model {
  uid?: string;
  name: string;
  description: string;
  
  createdAt: any = {};
  updatedAt: any = {};
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
  buyerRequirement?: string

  sellerId?: string;
  seller?: IUser;
  sellerRequirement?: string

  agentId?: string;
  agent?: IUser;

  createdById?: String;
  createdBy?: IUser;

  result?: TaskResult;

  appoinment?: Date[];

  constructor(obj?: ITask) {
    super();
    if (obj) {
      Object.assign(this, obj);
    }
  }

  createSchema() {
    return Joi.object();
  }

  onPrepareData(): any {
    let obj = {
      ...this,
    }

    return obj;
  }
}