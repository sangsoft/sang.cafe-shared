export class IBillItem {
  description: string;
  planData: any;
  unitPrice: number;
  renewalAfterDays: number;
  quantity: number;
  planId: string;
  restaurantId?: string;
  brokerageValue?: number;
}

export class BillItem {
  public description: string;
  public planData: any;
  public unitPrice: number;
  public renewalAfterDays: number;
  public quantity: number;
  public planId: string;
  public restaurantId?: string;
  public brokerageValue?: number;

  constructor(obj: IBillItem) {
    Object.assign(this, obj);
  }
}