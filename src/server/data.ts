import * as admin from 'firebase-admin';

export function objFromSnap(snap: admin.firestore.DocumentSnapshot): any {
  if (!snap || !snap.exists) {
    return null;
  }
  return {
    ...snap.data(),
    path: snap.ref.path,
    uid: snap.id
  }
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