import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';

import {AuthService} from './services/auth/auth.service';
import {MockAuthService} from '../tests/mocks/auth-service.mock';

import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MaterialModule} from './app-material.module';
import {JwtModule} from '@auth0/angular-jwt';
import {SocketService} from './services/socket/socket.service';
import {SocketServiceMock} from '../tests/mocks/socket-service';


describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationComponent,
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        JwtModule.forRoot({config: {
            tokenGetter: () => {
              return localStorage.getItem('id_token');
            },
            whitelistedDomains: [],
            blacklistedRoutes: []
          }})
      ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        {
          provide: SocketService,
          useClass: SocketServiceMock
        }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    authService = TestBed.get(AuthService);
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'Pictionary'`, async(() => {
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('Pictionary');
  // }));
  //


});
