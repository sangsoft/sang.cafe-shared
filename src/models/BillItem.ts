export class IBillItem {
  description: string;
  planData: any;
  unitPrice: number;
  renewalAfterDays: number;
  quantity: number;
  planId: string;
  restaurantId?: string;
}

export class BillItem {
  public description: string;
  public planData: any;
  public unitPrice: number;
  public renewalAfterDays: number;
  public quantity: number;
  public planId: string;
  public restaurantId?: string;

  constructor(obj: IBillItem) {
    Object.assign(this, obj);
  }
}