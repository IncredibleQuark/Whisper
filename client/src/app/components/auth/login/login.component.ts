import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  login(loginForm) {
    this.authService.authenticateUser(loginForm.value).subscribe( data => {

      if (data['success']) {
        this.authService.storeUserData(data['token'], data['user']);
        this.router.navigate(['/main']);
      } else {

      }
    }, err => {
      console.log(err);
    });
  }

}
