export declare function timestampFromObj(obj: {
    _seconds: number;
    _nanoseconds: number;
}): FirebaseFirestore.Timestamp;
export interface SerializedTimestamp {
    _seconds: number;
    _nanoseconds: number;
}
