import { Model } from "./Model";

export interface INotification {
  uid?: string;
  createdAt?: any;
  data: {
    type: string;
    restaurantUid?: string;
    userUid?: string;
    billUid?: string;
    billShortCode?: string;
  };
  body: string;
  title: string;
  topic: string;
}

export class Notification extends Model {
  public uid?: string;
  public createdAt?: any;
  public data: {
    type: string;
    restaurantUid?: string;
    userUid?: string;
    billUid?: string;
    billShortCode?: string;
  };
  public body: string;
  public title: string;
  public topic: string;

  constructor(obj: INotification) {
    super();
    Object.assign(this, obj);
  }

  onPrepareData() {
    let obj = {
      ...this
    }

    delete obj.createdAt;
    delete obj.uid;

    return obj;
  }
}
