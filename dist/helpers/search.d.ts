export declare type PriceRangeContext = undefined | 'low' | 'high' | 'none';
export declare function getPriceRangeTranslationOption({ range, }: {
    range: number[];
}): {
    min: number;
    max: number;
    context: PriceRangeContext;
};
export declare function getPriceRangeTranslationOptions({ range, }: {
    range: {
        [key: number]: number[];
    };
}): {
    min: number;
    max: number;
    context: PriceRangeContext;
    key: number;
}[];
