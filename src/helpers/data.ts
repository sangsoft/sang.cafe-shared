import * as admin from 'firebase-admin';
import { IRestaurant } from '../models/Restaurant';
import { cleanPhoneNumber } from './content';

export function objFromSnap(snap: admin.firestore.DocumentSnapshot, withSnap = false): any { // eslint-disable-line
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

export function restaurantFromSnap(
  doc: admin.firestore.DocumentSnapshot, 
  {
    keepSource,
    cleanContent,
  }: {
    keepSource?: boolean,
    cleanContent?: boolean,
  }): IRestaurant {
  const data: IRestaurant = objFromSnap(doc);
  if (data.place) {
    data.place = {
      geometry: data.place.geometry,
      url: data.place.url,
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