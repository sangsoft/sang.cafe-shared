import stringify from 'fast-safe-stringify';

export abstract class ServerDataProvider {
  abstract shouldProvideData(ctx): boolean;
  abstract async onPrepareData(ctx): Promise<{ [key: string]: any }>;

  async provide(ctx): Promise<{ [key: string]: any }> {
    return JSON.parse(stringify(await this.onPrepareData(ctx)));
  }
}