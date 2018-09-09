import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CanvasComponent} from './canvas.component';
import {MaterialModule} from "../../app-material.module";
import {FormsModule} from "@angular/forms";
import {CanvasService} from "../../services/canvas/canvas.service";
import {CanvasServiceMock} from "../../../tests/mocks/canvas-service.mock";
import {SocketService} from "../../services/socket/socket.service";
import {SocketServiceMock} from "../../../tests/mocks/socket-service";

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent],
      imports: [
        FormsModule,
        MaterialModule
      ],
      providers: [
        {
          provide: CanvasService,
          useClass: CanvasServiceMock
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
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
