import type { Model } from "./Model";
export interface IDeployment extends Model {
    data: {
        restaurants: string[];
    };
    file: {
        url: string;
    };
}
