import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatComponent} from './chat.component';
import {FormsModule} from '@angular/forms';
import {ChatService} from '../../services/chat/chat.service';
import {ChatServiceMock} from '../../../tests/mocks/chat-service.mock';
import {MaterialModule} from '../../app-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from "../../services/auth/auth.service";
import {MockAuthService} from "../../../tests/mocks/auth-service.mock";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {JwtServiceMock} from "../../../tests/mocks/jwt-service.mock";

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
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
        })
      ],
      providers: [
        {
          provide: ChatService,
          useClass: ChatServiceMock
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
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
