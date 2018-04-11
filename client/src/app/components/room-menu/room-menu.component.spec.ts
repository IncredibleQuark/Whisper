import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomMenuComponent } from './room-menu.component';

describe('RoomMenuComponent', () => {
  let component: RoomMenuComponent;
  let fixture: ComponentFixture<RoomMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
