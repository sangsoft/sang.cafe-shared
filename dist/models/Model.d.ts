import { Photo } from "./Photo";
export declare abstract class Model {
    private schema;
    path: string;
    constructor();
    abstract createSchema(): any;
    abstract onPrepareData(): any;
    toData(): any;
    flatten(): any;
    getPhotoCloudinaryPublicId(photo: string | Photo): string;
    getUrl(photo: string | Photo): string;
    toDataWithTimestamp(firebase: any, ownerId: string): any;
    errorPath(error: any): any;
    errorMessage(error: any): string;
    validate(): {
        [x: number]: Error;
    };
}
