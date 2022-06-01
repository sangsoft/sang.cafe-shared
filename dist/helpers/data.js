"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = require("./content");
function objFromSnap(snap, withSnap = false, options) {
    // eslint-disable-line
    if (!snap || !snap.exists) {
        return null;
    }
    let doNotOverwriteId = false;
    if (options) {
        doNotOverwriteId = options.doNotOverwriteId;
    }
    const data = Object.assign(Object.assign({}, snap.data()), { path: snap.ref.path, snap: withSnap ? snap : null }); // eslint-disable-line
    if (!doNotOverwriteId) {
        data.uid = snap.ref.id;
    }
    return data;
}
exports.objFromSnap = objFromSnap;
function projectFromSnap(snap, { showCustomer, membersSnap }) {
    const data = objFromSnap(snap);
    const relatedMembers = ((membersSnap === null || membersSnap === void 0 ? void 0 : membersSnap.docs) || []).map((snap) => objFromSnap(snap));
    if (!showCustomer) {
        delete data.customerName;
        delete data.customerId;
        delete data.customerCodeName;
    }
    return Object.assign(Object.assign({}, data), { relatedMembers });
}
exports.projectFromSnap = projectFromSnap;
function restaurantFromSnap(doc, { fromSlug, keepSource, cleanContent, }) {
    const data = objFromSnap(doc, false, {
        doNotOverwriteId: !!fromSlug
    });
    if (data.place) {
        data.place = {
            geometry: data.place.geometry || null,
            url: data.place.url || null,
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