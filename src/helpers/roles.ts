import { IProject, IRelatedMember } from '../models/Project';
import type { IRole } from '../models/Role';
import type { IUser } from '../models/User';

export function can(user: IUser, action: string): boolean {
  for (const role of user.roles || []) {
    if (isCapable(role, action)) {
      return true;
    }
  }
  return false;
}
export function canInProject(project: IProject, member: IRelatedMember, action: string): boolean {
  const memberInProject = !!project.relatedMembers.find((projectMember) => projectMember.uid === member.uid);
  for (const role of member.projectRoles || []) {
    if (role.superadmin) return true;
    return !!role.capabilities.find((capability) => {
      return (memberInProject && capability === action);
    });
  }
}

// function isCapableProject(project: IProject, role: IRole, action: string): boolean {
//   if (role.superadmin) {
//     return true;
//   }
//   return !!role.capabilities.find((capability) => capability == action);
// }

export function isActionAdmin(capability: string, action: string): boolean {
  const [target] = action.split(':');
  const [capTarget, capAction] = capability.split(':');

  if (capAction !== 'admin') {
    return false;
  }

  return capTarget === target;
}

export function isCapable(role: IRole, action: string): boolean {
  if (role.superadmin) {
    return true;
  }

  return !!role.capabilities.find((capability) => {
    return capability === action || isActionAdmin(capability, action);
  });
}

export function isSuperAdminRole(role: IRole): boolean {
  return role.superadmin;
}

export function isSuperAdmin(user: IUser): boolean {
  return user.admin && !!user.roles.find((role) => isSuperAdminRole(role));
}
