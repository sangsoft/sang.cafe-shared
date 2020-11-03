import { Model } from "./Model";
export interface IRole {
    uid?: string;
    'bill:admin': boolean;
    'restaurants:admin': boolean;
    'task:admin': boolean;
    'user:admin': boolean;
}
export declare class Role extends Model {
    uid?: string;
    capabilities: string[];
    superadmin: boolean;
    'bill:admin': boolean;
    'restaurants:admin': boolean;
    'task:admin': boolean;
    'user:admin': boolean;
    constructor(obj: IRole);
    can(action: string): boolean;
    createSchema(): any;
    onPrepareData(): any;
}
