import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import {FormsModule} from '@angular/forms';
import {ChatService} from '../../services/chat/chat.service';
import {ChatServiceMock} from '../../../tests/mocks/chat-service.mock';
import {MaterialModule} from '../../app-material.module';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [FormsModule, MaterialModule],
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
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
