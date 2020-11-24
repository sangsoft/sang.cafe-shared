import { IUser } from "./User";
import { Model } from "./Model";
export interface IComment {
    uid?: string;
    text: string;
    createdByUid: string;
    createdByUser?: IUser;
    createdAt?: any;
}
export declare class Comment extends Model {
    uid?: string;
    text: string;
    createdByUid: string;
    createdByUser?: IUser;
    createdAt?: any;
    constructor(obj?: IComment);
    createSchema(): any;
    onPrepareData(): any;
}
