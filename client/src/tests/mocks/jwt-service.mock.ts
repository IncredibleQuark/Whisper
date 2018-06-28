import {JwtHelperService} from "@auth0/angular-jwt";

export class JwtServiceMock extends JwtHelperService {

  isTokenExpired(token) {
    return true;
  }

}
