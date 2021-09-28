import * as admin from 'firebase-admin';
import { SerializedTimestamp } from '../helpers/times';

export enum CollectedInfoStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted'
}

export enum CollectedInfoRejectedReason {
  IMAGE_TOO_BLURRY = 'image-too-blurry',
  DUPLICATED = 'duplicated',
  CANNOT_CONTACT_OWNER = 'cannot-contact-owner',
}

export interface CollectedInfoInput {
  address: string;
  city: string;
  district: string;
  infoImage: string;
  overallImage: string;
}

export interface CollectedInfo extends CollectedInfoInput {
  status: CollectedInfoStatus;
  createdBy: string;
  createdAt: admin.firestore.Timestamp | Date | SerializedTimestamp;
  rejectedReason: CollectedInfoRejectedReason;
}

