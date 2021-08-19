import { Address4, Address6 } from 'ip-address';
import { firestore } from '../server/firebase';
import { objFromSnap } from './data';

export interface Range {
  from: string;
  to: string;
  country: string | null;
  city: string | null;
  district: string | null;
  fromBigInt: string | null;
  toBigInt: string | null;

}

export function ipToBigInteger(ip: string): string {
  let address;
  try {
    address = new Address4(ip);
  } catch (e) {
    address = new Address6(ip);
  }

  return address.bigInteger().toString();
}

export async function findBigIntIpRange(bigInt: string): Promise<Range | null>  {
  const snap = await firestore()
    .collection('IP_RANGES')
    .where('fromBigInt', '<=', bigInt)
    .orderBy('fromBigInt', 'desc')
    .limit(1)
    .get()
  if (snap.empty) {
    return null; 
  }

  const range = objFromSnap(snap.docs[0]);
  if (range.toBigInt >= bigInt) {
    return range;
  }

  return null;
}

export async function findIpRange(ip: string): Promise<Range | null> {
  const bigInt = ipToBigInteger(ip);
  return findBigIntIpRange(bigInt);
}