"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = require("./content");
function objFromSnap(snap, withSnap = false) {
    // eslint-disable-line
    if (!snap || !snap.exists) {
        return null;
    }
    return Object.assign(Object.assign({}, snap.data()), { path: snap.ref.path, uid: snap.id, snap: withSnap ? snap : null });
}
exports.objFromSnap = objFromSnap;
function projectFromSnap(snap, { showCustomer, membersSnap }) {
    const data = objFromSnap(snap);
    const relatedMembers = (membersSnap || []).map((snap) => objFromSnap(snap));
    if (!showCustomer) {
        delete data.customerName;
        delete data.customerId;
        delete data.customerCodeName;
    }
    return Object.assign(Object.assign({}, data), { relatedMembers });
}
exports.projectFromSnap = projectFromSnap;
function restaurantFromSnap(doc, { keepSource, cleanContent, }) {
    const data = objFromSnap(doc);
    if (data.place) {
        data.place = {
            geometry: data.place.geometry,
            url: data.place.url,
        };
    }
    if (cleanContent && data.brokerage) {
        data.description = content_1.cleanPhoneNumber(data.description || '');
    }
    if (!keepSource) {
        // eslint-disable-next-line
        delete data.source;
    }
    return data;
}
exports.restaurantFromSnap = restaurantFromSnap;
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