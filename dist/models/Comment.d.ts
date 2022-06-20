import { IUser } from "./User";
import { Model } from "./Model";
import { Photo } from "./Photo";
export interface IComment {
    uid?: string;
    text: string;
    createdByUid: string;
    createdByUser?: IUser;
    createdAt?: any;
    photos?: Photo[];
}
export declare class Comment extends Model {
    uid?: string;
    text: string;
    createdByUid: string;
    createdByUser?: IUser;
    createdAt?: any;
    photos?: Photo[];
    constructor(obj?: IComment);
    onPrepareData(): any;
}
