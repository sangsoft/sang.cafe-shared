export declare abstract class ServerDataProvider {
    abstract shouldProvideData(ctx: any): boolean;
    abstract onPrepareData(ctx: any): Promise<{
        [key: string]: any;
    }>;
    provide(ctx: any): Promise<{
        [key: string]: any;
    }>;
}
