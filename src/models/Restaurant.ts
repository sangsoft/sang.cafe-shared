import { RESTAURANT_TYPES, SUPPORTED_TYPES } from "./Enums";
import Joi from '@hapi/joi';
import { Model } from "./Model";
import { Photo, toPhoto } from "./Photo";
import { IUser } from "./User";
import { SearchRecord } from "./SearchRecord";
import { NearByResult } from "./Geo";

export interface CrawledSeed {
  city?: string;
  mix?: boolean;
  type?: string;
  url: string;
}

export interface CrawledSource {
  address?: string;
  type?: string;
  url: string;
  seed: CrawledSeed;
}

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
  photos: Photo[];
  name: string;
  title?: string;
  description: string;
  price: number;
  type: string;
  address: string;
  city: string;
  district: string;
  area: number;
  frontWidth: number;
  shortCode?: string;
  createdById?: string;
  numberOfFronts?: number;
  depth?: number;

  // Renting
  monthlyRent?: number;
  contractTimeLeft?: number;
  levels?: number;
  contractEnd?: { month: number, year: number };
  minimalContractTime?: number;

  // Level 0
  contact: string;
  contactPerson: string;
  landOwnerPhoneNumber?: string;

  // Level 1
  since?: number | { month: number, year: number };
  revenue?: number;
  grossProfit?: number;
  menuPhotoUrl: string | Photo;
  bannerPhotoUrl?: string | Photo;
  businessLicensePhotoUrl: string | Photo;
  employeeCount: number;
  hasPos?: boolean;
  hasLivingSpace?: boolean;
  
  show?: boolean;
  imageResized?: boolean;
  matches?: {
    fieldMatchingCount: number;
    fields: string[];
    search: SearchRecord;
  }[];

  // Level 999
  privateAddress?: string;
  privateContact?: string;
  privateContactPerson?: string;
  brokerage?: boolean;
  transactionInformation?: {
    buyerPhoneNumber?: string;
    transactionChannel?: string;
    transactionDate?: Date;
    transactionValue?: number;
  };
  source?: CrawledSource;

  temporaryBrokerage?: boolean;
  temporaryBillId?: string;
  temporaryBillShortcode?: string;
  
  status: string;

  tags?: string[];
  tagsDetail?: { [keys:string]: NearByResult[] },
  taggedAt?: any,
  geotagged?: boolean,

  taskId?: string,
  infoId?: string,
}

export class Restaurant extends Model {
  public name: string;
  public title?: string;
  public description: string;
  public price: number;
  public contact: string;
  public contactPerson: string;
  public type: string = SUPPORTED_TYPES.other.value;
  public photos: Photo[];
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
  public since?: number | { month: number, year: number } = new Date().getFullYear();
  public revenue?: number;
  public grossProfit?: number;
  public menuPhotoUrl: string | Photo;
  public businessLicensePhotoUrl: string | Photo;
  public employeeCount: number;
  public hasPos?: boolean = false;
  public hasLivingSpace?: boolean = false;
  public ad: boolean = false;
  public show: boolean = false;
  public area: number;
  public frontWidth: number;
  public imageResized?: boolean;
  public bannerPhotoUrl?: string | Photo;
  public slug?: string;
  public shortCode?: string;
  public createdById?: string;
  public numberOfFronts?: number;
  public depth?: number;
  public temporaryBrokerage?: boolean;
  public temporaryBillId?: string;
  public temporaryBillShortcode?: string;

  public landOwnerPhoneNumber?: string
  public monthlyRent?: number;
  public contractTimeLeft?: number;
  public contractEnd?: { month: number, year: number };
  public minimalContractTime?: number;

  public levels?: number;
  public matches?: {
    fieldMatchingCount: number;
    fields: string[];
    search: SearchRecord;
  }[];
  public privateAddress?: string;
  public privateContact?: string;
  public privateContactPerson?: string;
  public brokerage?: boolean;
  public transactionInformation?: {
    buyerPhoneNumber?: string;
    transactionChannel?: string;
    transactionDate?: Date;
    transactionValue?: number;
  }
  public source?: CrawledSource;
  public status: string;

  public tags?: string[];
  public tagsDetail?: { [keys:string]: NearByResult[] };
  public taggedAt?: any;
  public geotagged?: boolean;

  public taskId?: string;
  public infoId?: string;
  
  constructor(obj?: IRestaurant) {
    super();
    if (obj) {
      Object.assign(this, obj);
    }

    this.photos = this.photos ? this.photos.filter(_ => !!_) : [];
    if (!this.createdById) {
      this.createdById = this.ownerId;
    }
  }

  getThumpObj(photo: string | Photo): string | Photo {
    if (!photo) {
      return '';
    }
    if (typeof photo === 'string') {
      return photo;
    }

    if (photo.sml) {
      return photo.sml
    }

    if (photo.med) {
      return photo.med
    }

    return photo;
  }

  getMedObj(photo: string | Photo): string | Photo {
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

  getMedUrl(photo: string | Photo): string {
    return this.getUrl(this.getMedObj(photo));
  }

  getMainPhotoMedUrl(): string {
    return this.getMedUrl(this.getMainPhotoObj()) || this.getMedUrl(this.menuPhotoUrl) || this.getUrl(this.menuPhotoUrl);
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

  getPhotoCloudinaryPublicId(photo: string | Photo): string {
    const thePhoto = toPhoto(photo)
    if (thePhoto?.cloudinary) {
      return thePhoto.cloudinary.public_id
    }

    return this.getUrl(photo)
  }

  getBannerPhotoUrl(): string {
    if (this.bannerPhotoUrl) {
      return this.getMedUrl(this.bannerPhotoUrl);
    } else {
      return this.getMainPhotoMedUrl();
    }
  }

  getSmallBannerPhotoUrl(): string {
    if (this.bannerPhotoUrl) {
      return this.getThumbUrl(this.bannerPhotoUrl);
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
          })
          .allow(null),
        Joi.object(),
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
      'landOwnerPhoneNumber': Joi
        .string()
        .allow(''),
      'address': requiredString,
      'city': requiredString,
      'district': requiredString,
      'grossProfit': requiredNumber,
      'revenue': requiredNumber,
      'price': requiredNumber,
      'menuPhotoUrl': photo.required(),
      'businessLicensePhotoUrl': photo,
      'bannerPhotoUrl': photo,

      'privateAddress': Joi.string(),
      'privateContact': Joi.string(),
      'privateContactPerson': Joi.string(),
      'brokerage': Joi.boolean(),

      'createdById': Joi.string().allow(null),
      'shortCode': Joi.string().allow(null),
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
    delete obj.createdById;

    return obj;
  }
}