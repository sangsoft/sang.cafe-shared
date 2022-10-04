export interface SearchParameters {
    name?: string;
    district?: string | string[];
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
    monthlyRentalRange?: number;
    identity: string;
    tags?: string[];
    monthlyRentalFroms?: number[];
    monthlyRentalTos?: number[];
    monthlyRentalRanges?: number[];
    createdBy?: string;
}
