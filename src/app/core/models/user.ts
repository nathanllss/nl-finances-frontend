import { Account } from "./account";
import { Role } from "./role";

export interface User {
  id: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  username: string;
  password?: string;
  account: Account;
  roles: Role[];
  active: boolean;
}
