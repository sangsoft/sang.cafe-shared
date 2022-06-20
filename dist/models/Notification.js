"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
class Notification extends Model_1.Model {
    constructor(obj) {
        super();
        Object.assign(this, obj);
    }
    onPrepareData() {
        let obj = Object.assign({}, this);
        delete obj.createdAt;
        delete obj.uid;
        return obj;
    }
}
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map