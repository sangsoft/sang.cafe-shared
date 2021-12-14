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
export declare function guessUserTypeFromLabel(label: FBLabel): 'seller' | 'buyer' | 'broker' | 'owner' | null;
export declare function guessUserTypeFromLabels(labels: FBLabel[]): 'seller' | 'buyer' | 'broker' | 'owner' | null;
export declare function guessSearchParams(labels: FBLabel[], psid: string): SearchParameters[];
