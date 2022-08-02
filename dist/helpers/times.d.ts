import * as admin from 'firebase-admin';
export declare function timestampFromObj(obj: {
    _seconds: number;
    _nanoseconds: number;
}): admin.firestore.Timestamp;
export interface SerializedTimestamp {
    _seconds: number;
    _nanoseconds: number;
}
