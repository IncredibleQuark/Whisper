import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import {AuthService} from '../../services/auth/auth.service';
import {MockAuthService} from '../../../tests/mocks/auth-service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthGuard} from '../../guards/auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {MaterialModule} from '../../app-material.module';
import {JwtModule} from '@auth0/angular-jwt';
import {SocketService} from '../../services/socket/socket.service';
import {SocketServiceMock} from '../../../tests/mocks/socket-service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MaterialModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('id_token');
            },
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        {
          provide: SocketService,
          useClass: SocketServiceMock
        },
        AuthGuard
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
