import * as admin from 'firebase-admin';

export function timestampFromObj(obj: { _seconds: number; _nanoseconds: number }) {
  const ts = new admin.firestore.Timestamp(obj._seconds, obj._nanoseconds);
  console.log('Convering', obj, 'to', ts);
  return ts;
}

export interface SerializedTimestamp {
  _seconds: number;
  _nanoseconds: number;
}
