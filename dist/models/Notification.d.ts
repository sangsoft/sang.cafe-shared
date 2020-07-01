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
export declare class Notification extends Model {
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
    constructor(obj: INotification);
    createSchema(): any;
    onPrepareData(): this;
}
