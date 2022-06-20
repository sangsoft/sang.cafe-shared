"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
class Comment extends Model_1.Model {
    constructor(obj) {
        super();
        if (obj) {
            Object.assign(this, obj);
        }
    }
    onPrepareData() {
        let obj = Object.assign({}, this);
        return obj;
    }
}
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map