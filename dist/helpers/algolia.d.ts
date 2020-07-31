export declare let client: any;
export declare const indexes: {
    [key: string]: any;
};
export declare function searchRestaurant({ name, district, city, type, page, }: {
    name?: string;
    district?: string;
    city?: string;
    type?: string;
    page?: number;
}, ctx: any): Promise<{
    restaurants: any;
    nbHits: any;
    nbPages: any;
    exhaustiveNbHits: any;
}>;
