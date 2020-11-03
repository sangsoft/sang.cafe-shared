"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const joi_1 = __importDefault(require("@hapi/joi"));
class Role extends Model_1.Model {
    constructor(obj) {
        super();
        Object.assign(this, obj);
        this.capabilities = Object.keys(obj).map((key) => {
            if (['uid', 'superadmin'].includes(key)) {
                return null;
            }
            if (obj[key]) {
                return key;
            }
        })
            .filter(_ => !!_);
    }
    can(action) {
        if (this.superadmin) {
            return true;
        }
        return this.capabilities.includes(action);
    }
    createSchema() {
        return joi_1.default.object();
    }
    onPrepareData() {
        let obj = Object.assign({}, this);
        return obj;
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map