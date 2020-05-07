"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
function timestampFromObj(obj) {
    const ts = new admin.firestore.Timestamp(obj._seconds, obj._nanoseconds);
    console.log('Convering', obj, 'to', ts);
    return ts;
}
exports.timestampFromObj = timestampFromObj;
//# sourceMappingURL=times.js.map