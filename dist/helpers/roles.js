"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function can(user, action) {
    console.log('can', user.roles, action);
    for (const role of user.roles || []) {
        if (isCapable(role, action)) {
            return true;
        }
    }
    return false;
}
exports.can = can;
function isCapable(role, action) {
    console.log('isCapable', role, action);
    if (role.superadmin) {
        return true;
    }
    return Object.keys(action).includes(action) && role[action];
}
exports.isCapable = isCapable;
function isSuperAdminRole(role) {
    return role.superadmin;
}
exports.isSuperAdminRole = isSuperAdminRole;
function isSuperAdmin(user) {
    return user.admin && !!user.roles.find((role) => isSuperAdminRole(role));
}
exports.isSuperAdmin = isSuperAdmin;
//# sourceMappingURL=roles.js.map