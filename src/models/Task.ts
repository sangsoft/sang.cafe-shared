import { Model } from "./Model";
import Joi from '@hapi/joi';

export enum TaskStatus {
  PENDING = 'pending',
  ONGOING = 'ongoing',
  COMPLETE = 'complete',
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