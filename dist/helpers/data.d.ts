import * as admin from 'firebase-admin';
import { IProject } from '../models/Project';
import { IRestaurant } from '../models/Restaurant';
export declare function objFromSnap(snap: admin.firestore.DocumentSnapshot, withSnap?: boolean): any;
export declare function projectFromSnap(snap: admin.firestore.DocumentSnapshot, { showCustomer, membersSnap }: {
    showCustomer?: boolean;
    membersSnap?: admin.firestore.QuerySnapshot;
}): IProject | null;
export declare function restaurantFromSnap(doc: admin.firestore.DocumentSnapshot, { keepSource, cleanContent, }: {
    keepSource?: boolean;
    cleanContent?: boolean;
}): IRestaurant;
export declare function randomShortCode(size: any): string;
export declare function divideIntoLessThan10<T>(arr: T[]): T[][];
