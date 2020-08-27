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
  slug?: string;

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
  // Renting
  monthlyRent?: number;
  contractTimeLeft?: number;
  levels?: number;

  // Level 0
  contact: string;
  contactPerson: string;
  landOwnerPhoneNumber?: string;

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
  public bannerPhotoUrl?: string | Photo;
  public slug?: string;

  public landOwnerPhoneNumber?: string
  public monthlyRent?: number;
  public contractTimeLeft?: number;
  public levels?: number;

  constructor(obj?: IRestaurant) {
    super();
    if (obj) {
      Object.assign(this, obj);
    }

    this.photos = this.photos ? this.photos.filter(_ => !!_) : [];
  }

  getThumpObj(photo: string | Photo): string | Photo {
    if (!photo) {
      return '';
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
      return '';
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
      return '';
    }

    return photo;
  }

  getMainPhotoUrl(): string {
    return this.getUrl(this.getMainPhotoObj());
  }

  getMainPhotoThumbUrl(): string {
    return this.getThumbUrl(this.getMainPhotoObj()) || this.getThumbUrl(this.menuPhotoUrl) || this.getUrl(this.menuPhotoUrl);
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

  getBannerPhotoUrl(): string {
    if (this.bannerPhotoUrl) {
      return this.getUrl(this.bannerPhotoUrl);
    } else {
      return this.getMainPhotoThumbUrl();
    }
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
      'photos': Joi.array()
        .items(photo)
        .max(10)
        .required(),
      'name': Joi.string()
        .min(3)
        .max(256)
        .required(),
      'type': Joi.string()
        .valid(...Object.keys(SUPPORTED_TYPES))
        .required(),
      'since': requiredNumber,
      'employeeCount': requiredNumber,
      'hasPos': Joi.boolean()
        .required(),
      'description': requiredString,
      'contactPerson': requiredString,
      'contact': requiredString,
      'area': requiredNumber,
      'frontWidth': requiredNumber,
      'levels': Joi.number(),
      'monthlyRent': Joi.number(),
      'contractTimeLeft': Joi.number(),
      'landOwnerPhoneNumber': Joi.string(),
      'address': requiredString,
      'city': requiredString,
      'district': requiredString,
      'grossProfit': requiredNumber,
      'revenue': requiredNumber,
      'price': requiredNumber,
      'menuPhotoUrl': photo.required(),
      'businessLicensePhotoUrl': photo,
      'bannerPhotoUrl': photo,

      'ownerId': Joi.string(),
      'slug': Joi.string(),
      'place': Joi.object(),
      'uid': Joi.string(),
      'createdAt': Joi.object(),
      'updatedAt': Joi.object(),
      'approved': Joi.boolean(),
      'sold': Joi.boolean(),
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