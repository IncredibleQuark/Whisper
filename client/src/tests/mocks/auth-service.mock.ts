import {AuthService} from '../../app/services/auth/auth.service';

export class MockAuthService extends AuthService {

  /**
   * This method is implemented in the AuthService
   * we extend, but we overload it to make sure we
   * return a value we wish to test against
   */

  // registerUser(user: any) {
  //   return true;
  // }
  //
  // authenticateUser(user) {
  // }
  //
  // storeUserData(token, user) {
  // }

  loggedIn() {
    return true;
  }

  // loadToken() {
  // }
  //
  // logout() {
  // }

}
