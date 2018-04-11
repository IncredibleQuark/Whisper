import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';

import {AuthService} from './services/auth/auth.service';
import {MockAuthService} from '../tests/mocks/auth-service.mock';

import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

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
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
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

  it(`should have as title 'Whisper'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Whisper');
  }));
  //
  // it('should render title in a h1 tag', async(() => {
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));

});
