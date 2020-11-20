export interface SearchParameters {
  name?: string;
  district?: string;
  city?: string;
  type?: string;
  page?: number;
  priceFrom?: number;
  priceTo?: number;
  areaFrom?: number;
  areaTo?: number;
  levelsFrom?: number;
  levelsTo?: number;
  identity: string;
}
