import { Model } from "./Model";
import Joi from '@hapi/joi';

export interface IRole {
  uid?: string;
  'bill:admin': boolean;
  'restaurants:admin': boolean;
  'task:admin': boolean;
  'user:admin': boolean;
}

export class Role extends Model {
  uid?: string;
  capabilities: string[];
  superadmin: boolean;

  'bill:admin': boolean;
  'restaurants:admin': boolean;
  'task:admin': boolean;
  'user:admin': boolean;

  constructor(obj: IRole) {
    super();
    Object.assign(this, obj);
    this.capabilities = Object.keys(obj).map((key: string) => {
      if (['uid', 'superadmin', 'name'].includes(key)) {
        return null;
      }
      if (obj[key]) {
        return key;
      }
    })
      .filter(_ => !!_);
  }

  can(action: string): boolean {
    if (this.superadmin) {
      return true;
    }
    return this.capabilities.includes(action);
  }

  createSchema() {
    return Joi.object();
  }

  onPrepareData() {
    let obj: any = {
      ...this
    }
    return obj;
  }
}