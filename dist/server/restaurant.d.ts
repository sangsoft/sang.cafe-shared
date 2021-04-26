import { ServerContext } from '../models/ServerContext';
export declare function mergeWithSponsor({ sponsors, restaurants, user }: any, ctx: ServerContext): Promise<any>;
export declare function getRestaurant({ id }: {
    id: any;
}, ctx: ServerContext): Promise<any>;
export declare function getRestaurantBySlug({ slug }: {
    slug: any;
}, ctx: ServerContext): Promise<any>;
export declare function provideSavedStatus({ ownerId, restaurants }: any, ctx: ServerContext): Promise<any>;
export declare function getListing({ options, user }: any, ctx: ServerContext): Promise<any>;
export declare function getRestaurantsInList({ ids }: {
    ids: any;
}, ctx: ServerContext): Promise<any>;
export declare function getRestaurantsByPage(options: any, ctx: any): Promise<{
    restaurants: any;
    nbHits: any;
    nbPages: any;
    exhaustiveNbHits: any;
}>;
export declare function getRestaurantsByCursor(options: {
    after: number;
    before: number;
}, ctx: any): Promise<any>;
export declare function getRestaurants(options: any, ctx: any): Promise<any>;
export declare function getAllRestaurants(options: any, ctx: ServerContext): Promise<any>;
export declare function getLastestRestaurants({ limit }: {
    limit: number;
}, ctx: ServerContext): Promise<any>;
