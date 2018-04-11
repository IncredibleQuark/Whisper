import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPageComponent} from './main-page.component';
import {MaterialModule} from '../../app-material.module';
import {FormsModule} from '@angular/forms';
import {CanvasComponent} from '../canvas/canvas.component';
import {ChatComponent} from '../chat/chat.component';
import {ChatService} from '../../services/chat/chat.service';
import {ChatServiceMock} from '../../../tests/mocks/chat-service.mock';
import {RoomMenuComponent} from '../room-menu/room-menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageComponent, CanvasComponent, ChatComponent, RoomMenuComponent],
      imports: [BrowserAnimationsModule, FormsModule, MaterialModule],
      providers: [
        {
          provide: ChatService,
          useClass: ChatServiceMock
        }
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
