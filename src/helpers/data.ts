import * as admin from 'firebase-admin';
import { IProject, IRelatedMember } from '../models/Project';
import { IRestaurant } from '../models/Restaurant';
import { ISuggestion, StaffComment } from '../models/Suggestion';
import { cleanPhoneNumber } from './content';

export function objFromSnap(
  snap: admin.firestore.DocumentSnapshot,
  withSnap = false,
  options?: { doNotOverwriteId: boolean },
): any {
  // eslint-disable-line
  if (!snap || !snap.exists) {
    return null;
  }

  let doNotOverwriteId = false;
  if (options) {
    doNotOverwriteId = options.doNotOverwriteId;
  }
  const data = {
    ...snap.data(),
    path: snap.ref.path,
    snap: withSnap ? snap : null,
  } as any; // eslint-disable-line

  if (!doNotOverwriteId) {
    data.uid = snap.ref.id;
  }
  return data;
}

export function suggestionFromSnap(
  snap: admin.firestore.DocumentSnapshot,
  { commentsSnap }: { commentsSnap?: admin.firestore.QuerySnapshot },
): ISuggestion | null {
  const data: ISuggestion = objFromSnap(snap);
  const staffComments: StaffComment[] = (commentsSnap?.docs || []).map((snap) => objFromSnap(snap));
  return { ...data, staffComments };
}

export function projectFromSnap(
  snap: admin.firestore.DocumentSnapshot,
  { showCustomer, membersSnap }: { showCustomer?: boolean; membersSnap?: admin.firestore.QuerySnapshot },
): IProject | null {
  const data: IProject = objFromSnap(snap);
  const relatedMembers: IRelatedMember[] = (membersSnap?.docs || []).map((snap) => objFromSnap(snap));
  if (!showCustomer) {
    delete data.customerName;
    delete data.customerId;
    delete data.customerCodeName;
  }
  return { ...data, relatedMembers };
}

export function restaurantFromSnap(
  doc: admin.firestore.DocumentSnapshot,
  {
    fromSlug,
    keepSource,
    cleanContent,
  }: {
    keepSource?: boolean;
    cleanContent?: boolean;
    fromSlug?: boolean;
  },
): IRestaurant {
  const data: IRestaurant = objFromSnap(doc, false, {
    doNotOverwriteId: !!fromSlug,
  });
  if (data.place) {
    data.place = {
      geometry: data.place.geometry || null,
      url: data.place.url || null,
    };
  }

  if (cleanContent && data.brokerage) {
    data.description = cleanPhoneNumber(data.description || '');
  }

  if (!keepSource) {
    // eslint-disable-next-line
    delete (data as any).source;
  }
  return data;
}

export function randomShortCode(size) {
  const random = require('random');
  let code = '';
  let availables = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < size; i++) {
    let index = random.int(0, availables.length - 1);
    code += availables[index];
  }

  return code;
}

export function divideIntoLessThan10<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  while (arr.length > 0) {
    result.push(arr.splice(0, 10));
  }
  return result;
}
