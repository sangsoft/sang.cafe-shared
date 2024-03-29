import * as admin from 'firebase-admin';
import { Model } from '../models/Model';
import { IProject } from '../models/Project';
import { IRestaurant } from '../models/Restaurant';
import type { IRole } from '../models/Role';
import { ISuggestion } from '../models/Suggestion';
export declare function objFromSnap(snap: admin.firestore.DocumentSnapshot, withSnap?: boolean, options?: {
    doNotOverwriteId: boolean;
}): any;
export declare function suggestionFromSnap(snap: admin.firestore.DocumentSnapshot, { remarksSnap, commentsSnap, }: {
    remarksSnap?: admin.firestore.QuerySnapshot;
    commentsSnap?: admin.firestore.QuerySnapshot;
}): ISuggestion | null;
export declare function projectFromSnap(snap: admin.firestore.DocumentSnapshot, { showCustomer, membersSnap }: {
    showCustomer?: boolean;
    membersSnap?: admin.firestore.QuerySnapshot;
}): IProject | null;
export declare function roleFromSnap(snap: admin.firestore.DocumentSnapshot): IRole | null;
export declare function restaurantFromSnap(doc: admin.firestore.DocumentSnapshot, { fromSlug, keepSource, cleanContent, }: {
    keepSource?: boolean;
    cleanContent?: boolean;
    fromSlug?: boolean;
}): IRestaurant;
export declare function randomShortCode(size: any): string;
export declare function divideIntoLessThan10<T>(arr: T[]): T[][];
export declare function toData(model: Model): void;
export declare function toDataWithTimestamp(model: Model): void;
export declare function prepareRestaurant(restaurant: IRestaurant): IRestaurant;
