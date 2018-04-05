import { Component, OnInit } from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private authGuard: AuthGuard) {

  }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }
}
