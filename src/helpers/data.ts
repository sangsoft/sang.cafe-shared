import * as admin from 'firebase-admin';
import { IProject, IRelatedMember } from '../models/Project';
import { IRestaurant } from '../models/Restaurant';
import { cleanPhoneNumber } from './content';

export function objFromSnap(snap: admin.firestore.DocumentSnapshot, withSnap = false): any {
  // eslint-disable-line
  if (!snap || !snap.exists) {
    return null;
  }
  return {
    ...snap.data(),
    path: snap.ref.path,
    uid: snap.id,
    snap: withSnap ? snap : null,
  };
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
    keepSource,
    cleanContent,
  }: {
    keepSource?: boolean;
    cleanContent?: boolean;
  },
): IRestaurant {
  const data: IRestaurant = objFromSnap(doc);
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
