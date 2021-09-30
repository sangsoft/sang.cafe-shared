import { Model } from "./Model";
import Joi from '@hapi/joi';
import { Photo } from "./Photo";
import { SearchRecord } from "./SearchRecord";
import { Role } from "./Role";

export interface IUserStatus {
  level: number;
}

export interface IPaymentInfo {
  bank: string;
  accountName: string;
  account: string;
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
    phoneNumber: string;
    email?: string;
    displayName?: string;
    registerAsSeller?: boolean;
    idNumber?: string;
    address?: string;
    issueDate?: string;
    issueAuthority?: string;
  
    reason?: 'post' | 'view-contact';
    path?: string;
  },
  searches?: SearchRecord[];
  type?: string;
  roles?: Role[];
  identity?: string;
  note?: string;
  idNumber?: string;
  issueAuthority?: string;
  issueDate?: string;

  credentials?: Photo[];

  paymentInfo?: IPaymentInfo;
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
    phoneNumber: string;
    email?: string;
    displayName?: string;
    registerAsSeller?: boolean;
    idNumber?: string;
    address?: string;
    issueDate?: string;
    issueAuthority?: string;
  
    reason?: 'post' | 'view-contact';
    path?: string;
  }
  searches?: any[];
  type?: string;
  roles?: Role[];
  identity?: string;
  note?: string;

  credentials?: Photo[];

  idNumber?: string;
  issueAuthority?: string;
  issueDate?: string;

  paymentInfo?: IPaymentInfo;

  constructor(obj: IUser) {
    super();
    Object.assign(this, obj);
    this.roles = (obj.roles || []).map(role => new Role(role))
  }

  isSuperAdmin(): boolean {
    return (this.roles || []).some((role) => role.superadmin);
  }

  can(action: string): boolean {
    for (const role of (this.roles || [])) {
      if (role.can(action)) {
        return true;
      }
    }
    return false;
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
        Joi.object(),
      )
      .allow(null)

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
      'roles': Joi.array().allow(null),
      'identity': Joi.string().allow(null),
      'note': Joi.string().allow(null),
      'signInMetaData': Joi.object().allow(null),
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
    delete obj.roles;

    return obj;
  }

  flatten() {
    const obj = super.flatten();
    return {
      ...obj,
      roles: this.roles.map(role => role.flatten())
    };
  }
}