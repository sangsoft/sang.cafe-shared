import { SearchRecord } from "./SearchRecord";

import * as admin from 'firebase-admin';
import { IUser } from "./User";

export interface SearchMatch {
    search: SearchRecord,
    fields: string[],
    fieldMatchingCount: number,
    createdAt: admin.firestore.Timestamp,
    score: number
    user?: IUser;
  }
  