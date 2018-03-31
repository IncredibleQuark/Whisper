import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {
  authToken: any;
  user: any;
  userIsStaffMember: boolean;

  isDev: boolean;

  constructor(private http: Http) {
    this.isDev = true; // Change to false before deployment
  }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const ep = this.prepEndpoint('users/register');
    return this.http.post(ep, user, {headers: headers})
      .map(res => res.json());
  }

  prepEndpoint(ep) {
    if (this.isDev) {
      return ep;
    } else {
      return 'http://localhost:8080/' + ep;
    }
  }
}
