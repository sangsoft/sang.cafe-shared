"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
class Role extends Model_1.Model {
    constructor(obj) {
        super();
        Object.assign(this, obj);
        this.capabilities = Object.keys(obj).map((key) => {
            if (['uid', 'superadmin', 'name'].includes(key)) {
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
    onPrepareData() {
        let obj = Object.assign({}, this);
        return obj;
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map