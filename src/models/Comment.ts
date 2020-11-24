import { IUser } from "./User";
import { Model } from "./Model";
import Joi from '@hapi/joi';

export interface IComment {
  uid?: string;
  text: string;
  createdByUid: string;
  createdByUser?: IUser;
  createdAt?: any;
}

export class Comment extends Model {
  uid?: string;
  text: string;
  createdByUid: string;
  createdByUser?: IUser;
  createdAt?: any;

  constructor(obj?: IComment) {
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