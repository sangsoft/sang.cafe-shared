import { ServerContext } from '../models/ServerContext';
export declare function provideSponsorsWithRestaurantData({ sponsors }: {
    sponsors: any;
}, ctx: ServerContext): Promise<any>;
export declare function getSponsors({ plans, limit }: {
    plans: any;
    limit: any;
}, ctx: ServerContext): Promise<any[]>;
export declare function getBannerSponsors(options: any, ctx: ServerContext): Promise<any>;
