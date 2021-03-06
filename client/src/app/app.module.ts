import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './app-material.module';

import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {LandingComponent} from './components/landing/landing.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {ChatComponent} from './components/chat/chat.component';
import {CanvasComponent} from './components/canvas/canvas.component';

import {AuthGuard} from './guards/auth.guard';
import {AuthService} from './services/auth/auth.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomErrorStateMatcher} from './services/errorStateMatcher/error-state-matcher.service';
import {UsersListComponent} from './components/users-list/users-list.component';
import {GamePanelComponent} from './components/game-panel/game-panel.component';
import {CanvasService} from './services/canvas/canvas.service';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {SocketService} from './services/socket/socket.service';
import {WindowRef} from './helpers/windowRef';


const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]}
];

export function jwtTokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    ChatComponent,
    CanvasComponent,
    UsersListComponent,
    GamePanelComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: [],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [AuthService, AuthGuard, SocketService, CustomErrorStateMatcher, CanvasService, JwtHelperService],
  bootstrap: [AppComponent]
})

export class AppModule {

}
