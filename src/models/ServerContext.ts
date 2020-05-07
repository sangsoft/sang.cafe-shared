import { User } from "./User";

export interface ServerContext {
  auth?: any;
  user?: User;
}