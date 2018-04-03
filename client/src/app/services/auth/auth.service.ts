import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) {}

  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${environment.apiUrl}user/register`, user, { headers: headers});
  }

  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post( `${environment.apiUrl}user/authenticate`, user, { headers: headers });
  }
}
