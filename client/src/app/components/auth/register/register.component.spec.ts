import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../../../app-material.module';
import {AuthService} from '../../../services/auth/auth.service';
import {MockAuthService} from '../../../../tests/mocks/auth-service.mock';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {JwtServiceMock} from '../../../../tests/mocks/jwt-service.mock';
import {SocketService} from '../../../services/socket/socket.service';
import {SocketServiceMock} from '../../../../tests/mocks/socket-service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        JwtModule.forRoot({config: {
            tokenGetter: () => {
              return localStorage.getItem('id_token');
            },
            whitelistedDomains: [],
            blacklistedRoutes: []
          }})],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        {
          provide: JwtHelperService,
          useClass: JwtServiceMock
        },
        {
          provide: SocketService,
          useClass: SocketServiceMock
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit changeTab event', () => {
    let testValue = false;
    component.changedTab.subscribe(e => {
      testValue = e;
    });
    component.changeTab();
    expect(testValue).toBeTruthy();
  });

});
