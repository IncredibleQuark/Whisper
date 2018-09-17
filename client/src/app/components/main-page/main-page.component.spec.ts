import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MaterialModule} from '../../app-material.module';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {JwtModule} from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MainPageComponent} from './main-page.component';
import {CanvasComponent} from '../canvas/canvas.component';
import {ChatComponent} from '../chat/chat.component';
import {UsersListComponent} from '../users-list/users-list.component';
import {GamePanelComponent} from '../game-panel/game-panel.component';

import {CanvasService} from '../../services/canvas/canvas.service';
import {CanvasServiceMock} from '../../../tests/mocks/canvas-service.mock';
import {AuthService} from '../../services/auth/auth.service';
import {MockAuthService} from '../../../tests/mocks/auth-service.mock';
import {SocketService} from '../../services/socket/socket.service';
import {SocketServiceMock} from '../../../tests/mocks/socket-service';
import {NavigationComponent} from '../navigation/navigation.component';
import {AuthGuard} from '../../guards/auth.guard';
import {RouterTestingModule} from '@angular/router/testing';


describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent, CanvasComponent, ChatComponent, UsersListComponent, GamePanelComponent, NavigationComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule,
        HttpClientTestingModule,
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return localStorage.getItem('id_token');
            },
            whitelistedDomains: [],
            blacklistedRoutes: []
          }
        })
      ],
      providers: [
        {
          provide: SocketService,
          useClass: SocketServiceMock
        },
        {
          provide: CanvasService,
          useClass: CanvasServiceMock
        },
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        AuthGuard
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
