"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const joi_1 = __importDefault(require("@hapi/joi"));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "pending";
    TaskStatus["ONGOING"] = "ongoing";
    TaskStatus["COMPLETE"] = "complete";
})(TaskStatus = exports.TaskStatus || (exports.TaskStatus = {}));
var TaskType;
(function (TaskType) {
    TaskType["FILL_DATA"] = "fill-data";
    TaskType["COMMUNICATE_BUYER"] = "communicate-buyer";
    TaskType["BROKERAGE"] = "brokerage";
})(TaskType = exports.TaskType || (exports.TaskType = {}));
var TaskResult;
(function (TaskResult) {
    TaskResult["DONE"] = "done";
    // fill-data
    TaskResult["DATA_COMPLETED"] = "data-completed";
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
        this.status = TaskStatus.PENDING;
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