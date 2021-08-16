"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function objFromSnap(snap, withSnap = false) {
    if (!snap || !snap.exists) {
        return null;
    }
    return Object.assign(Object.assign({}, snap.data()), { path: snap.ref.path, uid: snap.id, snap: withSnap ? snap : null });
}
exports.objFromSnap = objFromSnap;
//# sourceMappingURL=data.js.map