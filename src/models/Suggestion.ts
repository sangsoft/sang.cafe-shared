import { SerializedTimestamp } from "../helpers/times"

export interface ISusggestion {
  uid: string
  customerCode: string
  code: string
  createdAt: SerializedTimestamp
  shortCodes: string[]
  ids: string[]
  customerName: string
}