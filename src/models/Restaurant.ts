import { RESTAURANT_TYPES, SUPPORTED_TYPES } from "./Enums";
import Joi from '@hapi/joi';
import { Model } from "./Model";
import { Photo } from "./Photo";

export interface IRestaurant {
  uid?: string;
  place?: any;
  saved?: boolean;
  ownerId: string;
  createdAt?: any;
  approved?: boolean;
  sold?: boolean;
  doc?: any;
  ad?: boolean;

  // Level -1
  photos: (string | Photo)[];
  name: string;
  description: string;
  price: number;
  type: string;
  address: string;
  city: string;
  district: string;
  area: number;
  frontWidth: number;

  // Level 0
  contact: string;
  contactPerson: string;

  // Level 1
  since: number;
  revenue: number;
  grossProfit: number;
  menuPhotoUrl: string | Photo;
  businessLicensePhotoUrl: string | Photo;
  employeeCount: number;
  hasPos: boolean;
  show?: boolean;
  imageResized?: boolean;
}

export class Restaurant extends Model {
  public name: string;
  public description: string;
  public price: number;
  public contact: string;
  public contactPerson: string;
  public type: string = SUPPORTED_TYPES.other.value;
  public photos: (string | Photo)[];
  public uid?: string;
  public place?: any;
  public address: string;
  public city: string;
  public district: string;
  public saved?: boolean;
  public ownerId: string;
  public createdAt?: any;
  public approved: boolean = false;
  public sold: boolean = false;
  public doc?: any;
  public since: number = new Date().getFullYear();
  public revenue: number;
  public grossProfit: number;
  public menuPhotoUrl: string | Photo;
  public businessLicensePhotoUrl: string | Photo;
  public employeeCount: number;
  public hasPos: boolean = false;
  public ad: boolean = false;
  public show: boolean = false;
  public area: number;
  public frontWidth: number;
  public imageResized?: boolean;

  constructor(obj?: IRestaurant) {
    super();
    if (obj) {
      Object.assign(this, obj);
    }

    this.photos = this.photos ? this.photos.filter(_ => !!_) : [];
  }

  getThumpObj(photo: string | Photo): string | Photo {
    if (!photo) {
      return null;
    }
    if (typeof photo === 'string') {
      return photo;
    }

    if (photo.med) {
      return photo.med
    }

    if (photo.sml) {
      return photo.sml
    }

    return photo;
  }

  getMainPhotoObj(): string | Photo {
    if (!this.photos) {
      return null;
    }

    let photo = this.photos.find(photo => {
      if (typeof photo === 'string') {
        return false;
      }

      return photo.main;
    });

    if (!photo) {
      photo = this.photos[0]
    }

    if (!photo) {
      return null;
    }

    return photo;
  }

  getMainPhotoUrl(): string {
    return this.getUrl(this.getMainPhotoObj());
  }

  getMainPhotoThumbUrl(): string {
    return this.getThumbUrl(this.getMainPhotoObj());
  }

  getThumbUrl(photo: string | Photo): string {
    return this.getUrl(this.getThumpObj(photo));
  }

  getMainThumbHeight(): number {
    let mainPhoto = this.getMainPhotoObj();
    let thumb = this.getThumpObj(mainPhoto);
    if (!thumb) {
      return -1;
    }

    if (typeof thumb === 'string') {
      return -1;
    }

    if (!thumb.dimensions) {
      return -1;
    }

    return thumb.dimensions.height;
  }

  createSchema() {
    const requiredString = Joi.string()
      .required()
    const requiredNumber = Joi.number()
      .required()
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
    const requiredUrl = Joi.string()
      .uri({
        scheme: [
          'https'
        ]
      })
      .required();

    return Joi.object({
      'uid': Joi.string(),
      'createdAt': Joi.object(),
      'updatedAt': Joi.object(),
      'approved': Joi.boolean(),
      'hasPos': Joi.boolean()
        .required(),
      'sold': Joi.boolean(),
      'employeeCount': requiredNumber,
      'since': requiredNumber,
      'revenue': requiredNumber,
      'area': requiredNumber,
      'frontWidth': requiredNumber,
      'grossProfit': requiredNumber,
      'menuPhotoUrl': photo.required(),
      'businessLicensePhotoUrl': photo.required(),
      'name': Joi.string()
        .min(3)
        .max(256)
        .required(),
      'ownerId': Joi.string(),
      'place': Joi.object(),
      'address': requiredString,
      'price': requiredNumber,
      'contact': requiredString,
      'contactPerson': requiredString,
      'description': requiredString,
      'city': requiredString,
      'district': requiredString,
      'photos': Joi.array()
        .items(photo)
        .max(10)
        .required(),
      'type': Joi.string()
        .valid(...Object.keys(SUPPORTED_TYPES))
        .required(),
    })
  }

  onPrepareData(): any {
    let obj = {
      ...this,
      photos: this.photos || []
    }

    delete obj.saved;
    // delete obj.uid;
    delete obj.approved;
    delete obj.doc;
    delete obj.ad;
    delete obj.show;
    delete obj.imageResized;

    return obj;
  }
}