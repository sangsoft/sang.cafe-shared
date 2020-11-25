import { Model } from "./Model";
import Joi from '@hapi/joi';
import { IUser } from "./User";

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
export class Task extends Model {
  uid?: string;
  name: string;
  description: string;
  restaurantId?: string;
  assigneeId?: string;
  props?: string[];
  notes?: ITaskNote[];
  status: TaskStatus = TaskStatus.PENDING;
  createdAt: any = {};
  updatedAt: any = {};
  type: TaskType;
  priority: number;
  assignee?: IUser;
  seller?: IUser;
  buyer?: IUser;
  agent?: IUser;
  result?: TaskResult;

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