import { firestore } from "./firebase";
import * as admin from 'firebase-admin';
import { IDeployment } from "../models/Deployment";
import { objFromSnap } from "./data";

export async function getLastDeployment(): Promise<IDeployment | null> {
  return firestore()
    .collection('DEPLOYMENTS')
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get()
    .then((snap: admin.firestore.QuerySnapshot) => {
      if (snap.empty) {
        return undefined;
      }
      return objFromSnap(snap.docs[0]);
    });
}
