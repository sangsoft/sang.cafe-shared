import { Model } from "./Model";
import { Photo } from "./Photo";
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
    constructor(obj: IUser);
    getPhotoUrl(): string;
    createSchema(): any;
    onPrepareData(): any;
}
