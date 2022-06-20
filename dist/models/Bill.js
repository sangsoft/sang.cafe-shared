"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
var BillStatus;
(function (BillStatus) {
    BillStatus["PENDING"] = "pending";
    BillStatus["PAID"] = "paid";
    BillStatus["CANCELLED"] = "cancelled";
    BillStatus["CONFIRMED"] = "confirmed";
    BillStatus["BROKER_CONTRACT_PAID"] = "broker-contract-paid";
    BillStatus["EXPIRED"] = "expired";
    BillStatus["PARTIAL_PAID"] = "partial-paid";
    BillStatus["TEMPORARY_CONFIRMED"] = "temprorary-confirmed";
})(BillStatus = exports.BillStatus || (exports.BillStatus = {}));
class Bill extends Model_1.Model {
    constructor(obj) {
        super();
        this.billExpiredAfterMinutes = 120;
        this.status = BillStatus.PENDING;
        this.paid = 0;
        Object.assign(this, obj);
    }
    onPrepareData() {
        let obj = Object.assign({}, this);
        delete obj.createdAt;
        delete obj.uid;
        return obj;
    }
}
exports.Bill = Bill;
//# sourceMappingURL=Bill.js.map