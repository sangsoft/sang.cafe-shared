"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const Model_1 = require("./Model");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "pending";
    TaskStatus["ONGOING"] = "ongoing";
    TaskStatus["COMPLETE"] = "complete";
    TaskStatus["DEPOSITED"] = "deposited";
    TaskStatus["DELEGATED"] = "delegated";
    TaskStatus["OUT_OF_DATE"] = "out-of-date";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
var TaskType;
(function (TaskType) {
    TaskType["FILL_DATA"] = "fill-data";
    TaskType["FINALIZE_POST"] = "finalize-post";
    TaskType["FINALIZE_OLD_POST"] = "finalize-old-post";
    TaskType["COMMUNICATE_BUYER"] = "communicate-buyer";
    TaskType["BROKERAGE"] = "brokerage";
    TaskType["CRAWLED_DATA"] = "crawled-data";
    TaskType["POST_EXTENSION"] = "post-extension";
    TaskType["HANDLE_COLLECTED_INFO"] = "handle-collected-info";
    TaskType["HANDLE_COLLECTED_INFO_MISSING_PHONE"] = "handle-collected-info-missing-phone";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
var TaskResult;
(function (TaskResult) {
    TaskResult["DONE"] = "done";
    // handle-collected-info
    TaskResult["DATA_COLLECTED_NOT_SATISFIED"] = "data-collected-not-satisfied";
    TaskResult["DATA_DUPLICATED"] = "data-duplicated";
    // post-extension
    TaskResult["EXTENDS"] = "extends";
    TaskResult["CHANGE_TO_BROKERAGE"] = "change-to-brokerage";
    TaskResult["SOLD"] = "sold";
    TaskResult["EXTENSION_REJECTED"] = "extension-rejected";
    // fill-data
    TaskResult["DATA_COMPLETED"] = "data-completed";
    // crawled-data
    TaskResult["SELLER_NOT_INTERESTED"] = "seller-not-interested";
    TaskResult["SELLER_ACCEPTED"] = "seller-accepted";
    TaskResult["SELLER_IS_BROKER"] = "is-broker";
    TaskResult["POST_NOT_COMPATIBLE"] = "post-not-compatible";
    TaskResult["FOR_SALE_PRICE_TOO_LOW"] = "for-sale-price-too-low";
    TaskResult["RENTAL_PRICE_TOO_LOW"] = "rental-price-too-low";
    TaskResult["COULDNT_CONTACT"] = "couldnt-contact";
    TaskResult["OLD_CUSTOMER_ACCEPTED"] = "old-customer-accepted";
    TaskResult["DUPLICATED"] = "deplicated";
    // communicate-buyer
    TaskResult["BUYER_NOT_INTERESTED"] = "buyer-not-interested";
    TaskResult["BUYER_CONSIDERING"] = "buyer-considering";
    // brokerage
    TaskResult["DEAL_SUCCESS"] = "deal-success";
    TaskResult["DEAL_FAILED_BUYER_REJECT"] = "deal-failed-buyer-reject";
    TaskResult["DEAL_FAILED_SELLER_REJECT"] = "deal-failed-seller-reject";
})(TaskResult = exports.TaskResult || (exports.TaskResult = {}));
class Task extends Model_1.Model {
    constructor(obj) {
        super();
        this.createdAt = {};
        this.updatedAt = {};
        if (obj) {
            Object.assign(this, obj);
        }
    }
    createSchema() {
        return joi_1.default.object();
    }
    onPrepareData() {
        let obj = Object.assign({}, this);
        return obj;
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map