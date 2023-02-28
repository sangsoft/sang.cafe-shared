import type { Model } from './Model';
import type { Photo } from './Photo';
import type { SearchRecord } from './SearchRecord';
import type { IRole } from './Role';
export interface IUserStatus {
    level: number;
}
export interface IPaymentInfo {
    bank: string;
    accountName: string;
    account: string;
}
export interface IUser extends Model {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string | Photo;
    uid?: string;
    customerCode?: string;
    canPost: boolean;
    admin: boolean;
    doc?: any;
    buyer?: IUserStatus;
    seller?: IUserStatus;
    createdFromTaskId?: string;
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
    roles?: IRole[];
    identity?: string;
    note?: string;
    idNumber?: string;
    issueAuthority?: string;
    issueDate?: string;
    credentials?: Photo[];
    paymentInfo?: IPaymentInfo;
    createdBy?: 'signup' | 'facebook' | 'chatfuel';
    fbPsid?: string;
    labels?: string[];
    isOrganization?: boolean;
    representativeName?: string;
    taxCode?: string;
    belongsToOrganization?: string;
    phoneNumbers: string[];
    phoneNumberRetrieved: boolean;
    phoneNumberRequestedBy: string;
    phoneNumberRequestedAt: any;
    phoneNumberRetrievedFailed: boolean;
}
