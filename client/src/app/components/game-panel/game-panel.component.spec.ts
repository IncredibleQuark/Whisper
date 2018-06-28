import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePanelComponent } from './game-panel.component';
import {MaterialModule} from "../../app-material.module";
import {GameService} from "../../services/game/game.service";
import {GameServiceMock} from "../../../tests/mocks/game-service.mock";
import {AuthService} from "../../services/auth/auth.service";
import {MockAuthService} from "../../../tests/mocks/auth-service.mock";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {JwtModule} from "@auth0/angular-jwt";

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
          provide: GameService,
          useClass: GameServiceMock
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
