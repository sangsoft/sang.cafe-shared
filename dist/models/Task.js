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