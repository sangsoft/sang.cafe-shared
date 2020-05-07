import { ServerDataProvider } from "./ServerDataProvider";
import { getBannerSponsors } from "../sponsor";

export class SponsorDataProvider extends ServerDataProvider {
  shouldProvideData(ctx): boolean {
    return true;
  }

  async onPrepareData(ctx): Promise<{ [key: string]: any }> {
    return {
      sponsors: await getBannerSponsors(),
    };
  }
}