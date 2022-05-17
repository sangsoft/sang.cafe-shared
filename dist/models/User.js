"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const joi_1 = __importDefault(require("@hapi/joi"));
const Role_1 = require("./Role");
class User extends Model_1.Model {
    constructor(obj) {
        super();
        this.displayName = '';
        this.email = '';
        this.phoneNumber = '';
        this.photoURL = '';
        this.canPost = false;
        this.admin = false;
        this.createdAt = {};
        this.updatedAt = {};
        this.buyer = null;
        this.seller = null;
        Object.assign(this, obj);
        this.roles = (obj.roles || []).map((role) => new Role_1.Role(role));
    }
    isSuperAdmin() {
        return (this.roles || []).some((role) => role.superadmin);
    }
    can(action) {
        for (const role of this.roles || []) {
            if (role.can(action)) {
                return true;
            }
        }
        return false;
    }
    getPhotoUrl() {
        return this.getUrl(this.photoURL);
    }
    createSchema() {
        const photo = joi_1.default.alternatives()
            .try(joi_1.default.string().uri({
            scheme: ['https'],
        }), joi_1.default.object())
            .allow(null);
        const requiredString = joi_1.default.string().required();
        return joi_1.default.object({
            uid: joi_1.default.string(),
            createdAt: joi_1.default.object(),
            updatedAt: joi_1.default.object(),
            displayName: requiredString,
            phoneNumber: requiredString,
            email: joi_1.default.string()
                .email({ tlds: { allow: false } })
                .required(),
            photoURL: photo,
            admin: joi_1.default.boolean(),
            canPost: joi_1.default.boolean(),
            roles: joi_1.default.array().allow(null),
            identity: joi_1.default.string().allow(null),
            note: joi_1.default.string().allow(null),
            signInMetaData: joi_1.default.object().allow(null),
        });
    }
    onPrepareData() {
        let obj = Object.assign({}, this);
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
        return Object.assign(Object.assign({}, obj), { roles: this.roles.map((role) => role.flatten()) });
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map