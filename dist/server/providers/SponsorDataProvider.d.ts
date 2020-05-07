import { ServerDataProvider } from "./ServerDataProvider";
export declare class SponsorDataProvider extends ServerDataProvider {
    shouldProvideData(ctx: any): boolean;
    onPrepareData(ctx: any): Promise<{
        [key: string]: any;
    }>;
}
