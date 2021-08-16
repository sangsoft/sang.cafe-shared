import * as admin from 'firebase-admin';

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
