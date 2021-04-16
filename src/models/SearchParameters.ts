export interface SearchParameters {
  name?: string;
  district?: string;
  city?: string;
  type?: string;
  page?: number;
  priceFrom?: number;
  priceTo?: number;
  priceRange?: number;
  areaFrom?: number;
  areaTo?: number;
  areaRange?: number;
  levelsFrom?: number;
  levelsTo?: number;
  frontWidthFrom?: number;
  frontWidthTo?: number;
  monthlyRentalFrom?: number;
  monthlyRentalTo?: number;
  identity: string;
}
