import {UserModel} from "./user.model";
import * as faker from 'faker';

describe('UserModel', () => {
  let username: string;
  let email: string;
  let rank: number;

  beforeEach( () => {
    username = faker.internet.userName();
    email = faker.internet.email();
    rank = faker.random.number();
  });

  it('is a valid user model', () => {
    let user = new UserModel(username, email, rank);
    expect(user.username).toEqual(username);
    expect(user.email).toEqual(email);
    expect(user.rank).toEqual(rank);
  })


});
