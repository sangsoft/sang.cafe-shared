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
        phoneNumber: string;
        email?: string;
        displayName?: string;
        registerAsSeller?: boolean;
        idNumber?: string;
        address?: string;
        issueDate?: string;
        issueAuthority?: string;
        reason?: 'post' | 'view-contact';
        path?: string;
    };
    searches?: SearchRecord[];
    type?: string;
    roles?: Role[];
    identity?: string;
    note?: string;
    idNumber?: string;
    issueAuthority?: string;
    issueDate?: string;
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
        phoneNumber: string;
        email?: string;
        displayName?: string;
        registerAsSeller?: boolean;
        idNumber?: string;
        address?: string;
        issueDate?: string;
        issueAuthority?: string;
        reason?: 'post' | 'view-contact';
        path?: string;
    };
    searches?: any[];
    type?: string;
    roles?: Role[];
    identity?: string;
    note?: string;
    idNumber?: string;
    issueAuthority?: string;
    issueDate?: string;
    constructor(obj: IUser);
    isSuperAdmin(): boolean;
    can(action: string): boolean;
    getPhotoUrl(): string;
    createSchema(): any;
    onPrepareData(): any;
    flatten(): any;
}
