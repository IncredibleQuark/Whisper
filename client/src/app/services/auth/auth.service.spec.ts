import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('id_token');
            },
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })],
      providers: [AuthService, JwtHelperService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
