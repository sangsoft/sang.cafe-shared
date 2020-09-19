import { SearchParameters } from "./SearchParameters";
import { IUser } from "./User";

export interface SearchRecord extends SearchParameters {
  name?: string;
  district?: string;
  city?: string;
  type?: string;
  page?: number;
  priceFrom?: number;
  priceTo?: number;
  areaFrom?: number;
  areaTo?: number;
  identity: string;
  user?: IUser;
}