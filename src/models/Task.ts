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