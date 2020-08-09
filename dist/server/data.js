"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function objFromSnap(snap) {
    if (!snap || !snap.exists) {
        return null;
    }
    return Object.assign(Object.assign({}, snap.data()), { path: snap.ref.path, uid: snap.id });
}
exports.objFromSnap = objFromSnap;
function randomShortCode(size) {
    const random = require('random');
    let code = '';
    let availables = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < size; i++) {
        let index = random.int(0, availables.length - 1);
        code += availables[index];
    }
    return code;
}
exports.randomShortCode = randomShortCode;
function divideIntoLessThan10(arr) {
    const result = [];
    while (arr.length > 0) {
        result.push(arr.splice(0, 10));
    }
    return result;
}
exports.divideIntoLessThan10 = divideIntoLessThan10;
//# sourceMappingURL=data.js.map