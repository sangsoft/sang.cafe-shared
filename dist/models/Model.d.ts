import { Photo } from "./Photo";
export declare abstract class Model {
    path: string;
    constructor();
    abstract onPrepareData(): any;
    toData(): any;
    flatten(): any;
    getUrl(photo: string | Photo): string;
    toDataWithTimestamp(firebase: any, ownerId: string): any;
    errorPath(error: any): any;
    errorMessage(error: any): string;
}
