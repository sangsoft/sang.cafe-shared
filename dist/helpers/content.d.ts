export declare function matchWithPatterns(text: string, patterns: RegExp[]): string[];
export declare function cleanPhoneNumber(text: string, patterns?: RegExp[]): string;
export declare function cleanAddress(text: string, patterns?: RegExp[]): string;
export interface PremiseParsedDetail {
    address: string;
    users: {
        displayName: string;
        idNumber: string;
        raw: string;
    }[];
    raw: string;
}
export declare function cleanContent(text?: string): string;
export declare function extractPremiseDetail(text: string): PremiseParsedDetail[];
