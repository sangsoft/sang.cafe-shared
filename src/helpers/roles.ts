import type { IRole } from "../models/Role";
import { IUser } from "../models/User";

export function can(user: IUser, action: string): boolean {
  console.log('can', user.roles, action)

  for (const role of user.roles || []) {
    if (isCapable(role, action)) {
      return true;
    }
  }
  return false;
}

export function isCapable(role: IRole, action: string): boolean {
  console.log('isCapable', role, action)
  if (role.superadmin) {
    return true;
  }
  return Object.keys(action).includes(action) && role[action];
}

export function isSuperAdminRole(role: IRole): boolean {
  return role.superadmin;
}

export function isSuperAdmin(user: IUser): boolean {
  return user.admin && !!user.roles.find((role) => isSuperAdminRole(role))
}