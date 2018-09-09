import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePanelComponent } from './game-panel.component';
import {MaterialModule} from "../../app-material.module";
import {AuthService} from "../../services/auth/auth.service";
import {MockAuthService} from "../../../tests/mocks/auth-service.mock";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {JwtModule} from "@auth0/angular-jwt";
import {SocketService} from "../../services/socket/socket.service";
import {SocketServiceMock} from "../../../tests/mocks/socket-service";

describe('GamePanelComponent', () => {
  let component: GamePanelComponent;
  let fixture: ComponentFixture<GamePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePanelComponent ],
      imports: [
        MaterialModule,
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
      providers: [
        {
          provide: SocketService,
          useClass: SocketServiceMock
        },
        {
          provide: AuthService,
          useClass: MockAuthService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
