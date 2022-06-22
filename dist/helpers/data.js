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
function suggestionFromSnap(snap, { remarksSnap, commentsSnap, }) {
    const data = objFromSnap(snap);
    const staffRemarks = ((remarksSnap === null || remarksSnap === void 0 ? void 0 : remarksSnap.docs) || []).map((snap) => objFromSnap(snap));
    const customerComments = ((commentsSnap === null || commentsSnap === void 0 ? void 0 : commentsSnap.docs) || []).map((snap) => objFromSnap(snap));
    return Object.assign(Object.assign({}, data), { staffRemarks, customerComments });
}
exports.suggestionFromSnap = suggestionFromSnap;
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
function roleFromSnap(snap) {
    const data = objFromSnap(snap);
    if (!data) {
        return null;
    }
    const capabilities = Object.keys(data).map((key) => {
        if (['uid', 'superadmin', 'name'].includes(key)) {
            return null;
        }
        if (data[key]) {
            return key;
        }
    })
        .filter(_ => !!_);
    return Object.assign(Object.assign({}, data), { capabilities });
}
exports.roleFromSnap = roleFromSnap;
function restaurantFromSnap(doc, { fromSlug, keepSource, cleanContent, }) {
    const data = objFromSnap(doc, false, {
        doNotOverwriteId: !!fromSlug,
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
function toData(model) {
}
exports.toData = toData;
function toDataWithTimestamp(model) {
}
exports.toDataWithTimestamp = toDataWithTimestamp;
function prepareRestaurant(restaurant) {
    const obj = Object.assign(Object.assign({}, this), { photos: this.photos || [] });
    delete obj.saved;
    // delete obj.uid;
    delete obj.approved;
    delete obj.doc;
    delete obj.ad;
    delete obj.show;
    delete obj.imageResized;
    delete obj.createdById;
    return obj;
}
exports.prepareRestaurant = prepareRestaurant;
//# sourceMappingURL=data.js.map