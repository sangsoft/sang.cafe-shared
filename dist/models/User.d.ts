import { Model } from "./Model";
import { Photo } from "./Photo";
import { SearchRecord } from "./SearchRecord";
import { Role } from "./Role";
export interface IUserStatus {
    level: number;
}
export interface IUser {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string | Photo;
    uid?: string;
    canPost: boolean;
    admin: boolean;
    doc?: any;
    buyer?: IUserStatus;
    seller?: IUserStatus;
    signInMetaData?: {
        reason?: 'post' | 'view-contact';
        path?: string;
    };
    searches?: SearchRecord[];
    type?: string;
    roles?: Role[];
}
export declare class User extends Model {
    uid?: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string | Photo;
    canPost: boolean;
    admin: boolean;
    createdAt: any;
    updatedAt: any;
    doc?: any;
    buyer?: IUserStatus;
    seller?: IUserStatus;
    signInMetaData?: {
        reason?: 'post' | 'view-contact';
        path?: string;
    };
    searches?: any[];
    type?: string;
    roles?: Role[];
    constructor(obj: IUser);
    can(action: string): boolean;
    getPhotoUrl(): string;
    createSchema(): any;
    onPrepareData(): any;
    flatten(): {
        obj: any;
        roles: (() => any)[];
    };
}
