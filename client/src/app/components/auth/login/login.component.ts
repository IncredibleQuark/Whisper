import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(loginForm) {
    this.authService.authenticateUser(loginForm.value).subscribe( data => {

      if (data['success']) {
        this.authService.storeUserData(data['token'], data['user']);
        this.router.navigate(['/main']);
      } else {
        this.snackBar.open('Invalid credentials!', null, {duration: 100000, panelClass: 'snackbar-error'});
      }
    }, err => {
      console.log(err);
    });
  }

}
