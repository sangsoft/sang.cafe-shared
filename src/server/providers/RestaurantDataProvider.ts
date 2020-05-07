import { ServerDataProvider } from "./ServerDataProvider";
import { getRestaurant } from '../restaurant';
export class RestaurantDataProvider extends ServerDataProvider {
  shouldProvideData(ctx): boolean {
    return true;
  }

  async onPrepareData(ctx): Promise<{ [key: string]: any }> {
    let { id } = ctx.query;
    let restaurant = await getRestaurant({ id });
    return {
      restaurant
    };
  }
}