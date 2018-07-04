import {IUser} from "../../interfaces/user.interface";

export class UserModel implements IUser {

  constructor(public username: string,
              public email: string,
              public rank: number) { }
}
