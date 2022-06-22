import type { Model } from "./Model";
export interface INotification extends Model {
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
