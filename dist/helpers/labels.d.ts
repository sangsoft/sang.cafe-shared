import type { SearchParameters } from '../models/SearchParameters';
import type { FBLabel } from '../models/facebook';
export declare const Tags: string[];
export declare const DistrictKeywords: {
    [key: string]: {
        keywords: string[];
        city: string;
    };
};
export declare function guessPhoneNumberFromLabel(label: FBLabel): string | null;
export declare function guessPhoneNumberFromLabels(labels: FBLabel[]): string | null;
export declare function guessUserTypeFromLabel(label: FBLabel): 'seller' | 'buyer' | 'broker' | 'owner' | null;
export declare function guessUserTypeFromLabels(labels: FBLabel[]): 'seller' | 'buyer' | 'broker' | 'owner' | null;
export declare function extractPriceFromLabel(label: FBLabel): number | null;
export declare function extractPriceFromLabels(labels: FBLabel[]): number | null;
export declare function extractMonthlyRentFromLabel(label: FBLabel): number | null;
export declare function extractMonthlyRentFromLabels(labels: FBLabel[]): number | null;
export declare function extractDistricts(labels: FBLabel[]): string[];
export declare function getCity(district: string): string;
export declare function extractTags(labels: FBLabel[]): string[];
export declare function guessSearchParams(labels: FBLabel[], psid: string): SearchParameters[];
