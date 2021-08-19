export interface Range {
    from: string;
    to: string;
    country: string | null;
    city: string | null;
    district: string | null;
    fromBigInt: string | null;
    toBigInt: string | null;
}
export declare function ipToBigInteger(ip: string): string;
export declare function findBigIntIpRange(bigInt: string): Promise<Range | null>;
export declare function findIpRange(ip: string): Promise<Range | null>;
