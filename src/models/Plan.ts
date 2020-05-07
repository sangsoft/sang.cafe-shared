export interface IPlan {
  name: string;
  price: number;
  type: string;
  headerColor?: string;
  headerTextColor?: string;
  actionBtn: any;
  details: {
    text: string;
    available: boolean;
  }[];
  slug: string;
  uid?: string;
  period: number;
}
export class Plan {
  public name: string;
  public price: number;
  public type: string;
  public headerColor?: string;
  public headerTextColor?: string;
  public slug: string;
  public uid?: string;
  public period: number;

  public actionBtn: any;
  public details: {
    text: string;
    available: boolean;
  }[];

  constructor(obj: IPlan) {
    Object.assign(this, obj);
  }
}