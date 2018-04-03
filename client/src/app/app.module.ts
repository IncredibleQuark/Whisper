import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth/auth.service';
import {LandingComponent} from './components/landing/landing.component';
import { MainPageComponent } from './components/main-page/main-page.component';


const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'main', component: MainPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
