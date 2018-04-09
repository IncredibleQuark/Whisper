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
import {ChatService} from './services/chat/chat.service';
import {AuthService} from './services/auth/auth.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomErrorStateMatcher} from './services/errorStateMatcher/error-state-matcher.service';


const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  {path: '', component: NavigationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
    ChatComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [AuthService, AuthGuard, ChatService, CustomErrorStateMatcher],
  bootstrap: [AppComponent]
})

export class AppModule {
}
