import type { IRole } from "../models/Role";
import { IUser } from "../models/User";
export declare function can(user: IUser, action: string): boolean;
export declare function isCapable(role: IRole, action: string): boolean;
export declare function isSuperAdminRole(role: IRole): boolean;
export declare function isSuperAdmin(user: IUser): boolean;
