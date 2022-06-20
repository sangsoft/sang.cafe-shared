"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
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