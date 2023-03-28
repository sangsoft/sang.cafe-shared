export declare function matchWithPatterns(text: string, patterns: RegExp[]): string[];
export declare function cleanPhoneNumber(text: string, patterns?: RegExp[]): string;
export declare function cleanAddress(text: string, patterns?: RegExp[]): string;
export declare function extractPremiseDetail(text: string): {
    displayName: string;
    idNumber: string;
}[];
