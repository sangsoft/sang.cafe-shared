import { ServerDataProvider } from "./ServerDataProvider";

export class AuthenticatedUserDataProvider extends ServerDataProvider {
  shouldProvideData(ctx): boolean {
    return true;
  }

  async onPrepareData(ctx): Promise<{ [key: string]: any }> {
    console.log(ctx.req.rawHeaders);
    return {};
  }
}