import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()

export class AuthService {

  authToken: string;
  user: any;

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  registerUser(user) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(`${environment.apiUrl}user/register`, user, {headers: headers});
  }

  authenticateUser(user) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post(`${environment.apiUrl}user/authenticate`, user, {headers: headers});
  }

  getProfile() {
    const headers = {'Authorization': this.authToken, 'Content-Type': 'application/json'};
    return this.http.get(`${environment.apiUrl}user/profile`, {headers: headers});
  }

  storeUserData(token, user) {

    const usr = JSON.stringify(user);
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', usr);
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}
