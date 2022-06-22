import type { IUser } from "./User";
import type { Model } from "./Model";
import type { Photo } from "./Photo";
export interface IComment extends Model {
    uid?: string;
    text: string;
    createdByUid: string;
    createdByUser?: IUser;
    createdAt?: any;
    photos?: Photo[];
}
