import * as admin from 'firebase-admin';
import { Model } from '../models/Model';
import { IProject, IRelatedMember } from '../models/Project';
import { IRestaurant } from '../models/Restaurant';
import type { IRole } from '../models/Role';
import { CustomerComment, ISuggestion, StaffRemark } from '../models/Suggestion';
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
  {
    remarksSnap,
    commentsSnap,
  }: { remarksSnap?: admin.firestore.QuerySnapshot; commentsSnap?: admin.firestore.QuerySnapshot },
): ISuggestion | null {
  const data: ISuggestion = objFromSnap(snap);
  const staffRemarks: StaffRemark[] = (remarksSnap?.docs || []).map((snap) => objFromSnap(snap));
  const customerComments: CustomerComment[] = (commentsSnap?.docs || []).map((snap) => objFromSnap(snap));
  return { ...data, staffRemarks, customerComments };
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

export function roleFromSnap(
  snap: admin.firestore.DocumentSnapshot
): IRole | null {
  const data: IRole = objFromSnap(snap);
  if (!data) {
    return null;
  }

  const capabilities = Object.keys(data).map((key: string) => {
    if (['uid', 'superadmin', 'name'].includes(key)) {
      return null;
    }
    if (data[key]) {
      return key;
    }
  })
    .filter(_ => !!_);

  return {
    ...data,
    capabilities
  }
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

export function toData(model: Model) {

}

export function toDataWithTimestamp(model: Model) {

}

export function prepareRestaurant(restaurant: IRestaurant): IRestaurant {
  const obj = {
    ...this,
    photos: this.photos || [],
  };

  delete obj.saved;
  // delete obj.uid;
  delete obj.approved;
  delete obj.doc;
  delete obj.ad;
  delete obj.show;
  delete obj.imageResized;
  delete obj.createdById;

  return obj;
}