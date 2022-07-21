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
function canInProject(project, member, action) {
    const memberInProject = !!project.relatedMembers.find((projectMember) => projectMember.uid === member.uid);
    for (const role of member.projectRoles || []) {
        if (role.superadmin)
            return true;
        return !!role.capabilities.find((capability) => {
            return (memberInProject && capability === action) || isActionAdmin(capability, action);
        });
    }
}
exports.canInProject = canInProject;
// function isCapableProject(project: IProject, role: IRole, action: string): boolean {
//   if (role.superadmin) {
//     return true;
//   }
//   return !!role.capabilities.find((capability) => capability == action);
// }
function isActionAdmin(capability, action) {
    const [target] = action.split(':');
    const [capTarget, capAction] = capability.split(':');
    if (capAction !== 'admin') {
        return false;
    }
    return capTarget === target;
}
exports.isActionAdmin = isActionAdmin;
function isCapable(role, action) {
    if (role.superadmin) {
        return true;
    }
    return !!role.capabilities.find((capability) => {
        return capability === action || isActionAdmin(capability, action);
    });
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