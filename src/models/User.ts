import { Model } from "./Model";
import Joi from '@hapi/joi';
import { Photo } from "./Photo";
import { SearchRecord } from "./SearchRecord";

export interface IUserStatus {
  level: number;
}

export interface IUser {
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string | Photo;
  uid?: string;
  canPost: boolean;
  admin: boolean;
  doc?: any;
  buyer?: IUserStatus;
  seller?: IUserStatus;
  signInMetaData?: {
    reason?: 'post' | 'view-contact';
    path?: string;
  },
  searches?: SearchRecord[];
  type?: string;
  roles?: string[];
}

export class User extends Model {
  uid?: string;
  displayName: string = '';
  email: string = '';
  phoneNumber: string = '';
  photoURL: string | Photo = '';
  canPost: boolean = false;
  admin: boolean = false;
  createdAt: any = {};
  updatedAt: any = {};
  doc?: any;
  buyer?: IUserStatus = null;
  seller?: IUserStatus = null;
  signInMetaData?: {
    reason?: 'post' | 'view-contact';
    path?: string
  }
  searches?: any[];
  type?: string;
  roles?: string[];

  constructor(obj: IUser) {
    super();
    Object.assign(this, obj);
  }

  getPhotoUrl(): string {
    return this.getUrl(this.photoURL);
  }

  createSchema() {
    const photo = Joi
      .alternatives()
      .try(
        Joi.string()
          .uri({
            scheme: [
              'https'
            ]
          }),
        Joi.object()
      )

    const requiredString = Joi.string()
      .required()
    return Joi.object({
      'uid': Joi.string(),
      'createdAt': Joi.object(),
      'updatedAt': Joi.object(),
      'displayName': requiredString,
      'phoneNumber': requiredString,
      'email': Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      'photoURL': photo,
      'admin': Joi.boolean(),
      'canPost': Joi.boolean(),
    });
  }

  onPrepareData() {
    let obj: any = {
      ...this
    }

    delete obj.buyer;
    delete obj.seller;
    delete obj.canPost;
    delete obj.admin;
    delete obj.doc;
    delete obj.requestPost;

    return obj;
  }
}