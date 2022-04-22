import { SerializedTimestamp } from "../helpers/times"

export enum SuggestionStatus {
  ACTIVE = 'active',
  OUTDATED = 'outdated'
}

export interface SuggestionShortList {
  shortListedById: string,
  shortCode: string,
  createdAt: SerializedTimestamp
}

export interface ISusggestion {
  uid: string
  customerCode: string
  code: string
  createdAt: SerializedTimestamp
  shortCodes: string[]
  ids: string[]
  customerName: string
  status: SuggestionStatus
  createdById: string
  createdBy: {
    displayName: string,
    phoneNumber: string
  },
  projectId: string,
  oldSuggestionID: string | null,
  shortList: SuggestionShortList[]
}