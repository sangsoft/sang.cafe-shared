"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Enums_1 = require("./Enums");
const joi_1 = __importDefault(require("@hapi/joi"));
const Model_1 = require("./Model");
class Restaurant extends Model_1.Model {
    constructor(obj) {
        super();
        this.type = Enums_1.SUPPORTED_TYPES.other.value;
        this.approved = false;
        this.sold = false;
        this.since = new Date().getFullYear();
        this.hasPos = false;
        this.ad = false;
        this.show = false;
        if (obj) {
            Object.assign(this, obj);
        }
        this.photos = this.photos ? this.photos.filter(_ => !!_) : [];
    }
    getThumpObj(photo) {
        if (!photo) {
            return '';
        }
        if (typeof photo === 'string') {
            return photo;
        }
        if (photo.med) {
            return photo.med;
        }
        if (photo.sml) {
            return photo.sml;
        }
        return photo;
    }
    getMainPhotoObj() {
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
            photo = this.photos[0];
        }
        if (!photo) {
            return '';
        }
        return photo;
    }
    getMainPhotoUrl() {
        return this.getUrl(this.getMainPhotoObj());
    }
    getMainPhotoThumbUrl() {
        return this.getThumbUrl(this.getMainPhotoObj());
    }
    getThumbUrl(photo) {
        return this.getUrl(this.getThumpObj(photo));
    }
    getMainThumbHeight() {
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
    getBannerPhotoUrl() {
        if (this.bannerPhotoUrl) {
            return this.getUrl(this.bannerPhotoUrl);
        }
        else {
            return this.getMainPhotoUrl();
        }
    }
    createSchema() {
        const requiredString = joi_1.default.string()
            .required();
        const requiredNumber = joi_1.default.number()
            .required();
        const photo = joi_1.default
            .alternatives()
            .try(joi_1.default.string()
            .uri({
            scheme: [
                'https'
            ]
        }), joi_1.default.object());
        const requiredUrl = joi_1.default.string()
            .uri({
            scheme: [
                'https'
            ]
        })
            .required();
        return joi_1.default.object({
            'photos': joi_1.default.array()
                .items(photo)
                .max(10)
                .required(),
            'name': joi_1.default.string()
                .min(3)
                .max(256)
                .required(),
            'type': joi_1.default.string()
                .valid(...Object.keys(Enums_1.SUPPORTED_TYPES))
                .required(),
            'since': requiredNumber,
            'employeeCount': requiredNumber,
            'hasPos': joi_1.default.boolean()
                .required(),
            'description': requiredString,
            'contactPerson': requiredString,
            'contact': requiredString,
            'area': requiredNumber,
            'frontWidth': requiredNumber,
            'levels': joi_1.default.number(),
            'monthlyRent': joi_1.default.number(),
            'contractTimeLeft': joi_1.default.number(),
            'landOwnerPhoneNumber': joi_1.default.string(),
            'address': requiredString,
            'city': requiredString,
            'district': requiredString,
            'grossProfit': requiredNumber,
            'revenue': requiredNumber,
            'price': requiredNumber,
            'menuPhotoUrl': photo.required(),
            'businessLicensePhotoUrl': photo,
            'bannerPhotoUrl': photo,
            'ownerId': joi_1.default.string(),
            'slug': joi_1.default.string(),
            'place': joi_1.default.object(),
            'uid': joi_1.default.string(),
            'createdAt': joi_1.default.object(),
            'updatedAt': joi_1.default.object(),
            'approved': joi_1.default.boolean(),
            'sold': joi_1.default.boolean(),
        });
    }
    onPrepareData() {
        let obj = Object.assign(Object.assign({}, this), { photos: this.photos || [] });
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
exports.Restaurant = Restaurant;
//# sourceMappingURL=Restaurant.js.map