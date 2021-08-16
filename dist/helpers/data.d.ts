import * as admin from 'firebase-admin';
export declare function objFromSnap(snap: admin.firestore.DocumentSnapshot, withSnap?: boolean): any;
export declare function randomShortCode(size: any): string;
export declare function divideIntoLessThan10<T>(arr: T[]): T[][];
