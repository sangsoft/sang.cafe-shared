"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function can(user, action) {
    for (const role of user.roles || []) {
        if (isCapable(role, action)) {
            return true;
        }
    }
    return false;
}
exports.can = can;
function isCapable(role, action) {
    if (role.superadmin) {
        return true;
    }
    return Object.keys(action).includes(action) && role[action];
}
exports.isCapable = isCapable;
//# sourceMappingURL=roles.js.map