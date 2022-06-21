import type { Model } from "./Model";

export interface IRole extends Model {
  uid?: string;
  superadmin: boolean;
  'bill:admin': boolean;
  'restaurants:admin': boolean;
  'task:admin': boolean;
  'user:admin': boolean;
}