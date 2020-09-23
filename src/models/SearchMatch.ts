import { SearchRecord } from "./SearchRecord";

import * as admin from 'firebase-admin';

export interface SearchMatch {
    search: SearchRecord,
    fields: string[],
    fieldMatchingCount: number,
    createdAt: admin.firestore.Timestamp,
    score: number
  }
  