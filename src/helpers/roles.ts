import type { IRole } from "../models/Role";
import type { IUser } from "../models/User";

export function can(user: IUser, action: string): boolean {
  for (const role of user.roles || []) {
    if (isCapable(role, action)) {
      return true;
    }
  }
  return false;
}

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

  return !!role
    .capabilities
    .find((capability) => {
      return capability === action || isActionAdmin(capability, action)
    });
}

export function isSuperAdminRole(role: IRole): boolean {
  return role.superadmin;
}

export function isSuperAdmin(user: IUser): boolean {
  return user.admin && !!user.roles.find((role) => isSuperAdminRole(role))
}