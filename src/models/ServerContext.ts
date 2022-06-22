import { IUser } from "./User";

export interface ServerContext {
  auth?: any;
  user?: IUser;
}