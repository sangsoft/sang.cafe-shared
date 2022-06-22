import type { SerializedTimestamp } from '../helpers/times';
import type * as admin from 'firebase-admin';

export interface Model {
  uid?: string;
  path?: string;
  updatedAt?: SerializedTimestamp | admin.firestore.Timestamp | Date | string;
  createdAt?: SerializedTimestamp | admin.firestore.Timestamp | Date | string;
}