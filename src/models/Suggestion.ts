import { SerializedTimestamp } from "../helpers/times"

export enum SuggestionStatus {
  ACTIVE = 'active',
  OUTDATED = 'outdated'
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
  }
}