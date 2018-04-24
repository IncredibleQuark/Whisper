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
        this.snackBar.open('You are logged in!', null, {duration: 4000, panelClass: 'snackbar-success'});

      } else if (data['msg'] === 'Wrong password') {

        loginForm.form.controls.password.status = 'INVALID';
        this.snackBar.open('Wrong password!', null, {duration: 4000, panelClass: 'snackbar-error'});

      } else {

        loginForm.form.controls.email.status = 'INVALID';
        loginForm.form.controls.password.status = 'INVALID';
        this.snackBar.open('Invalid credentials!', null, {duration: 4000, panelClass: 'snackbar-error'});

      }
    }, err => {
      console.log(err);
      this.snackBar.open('Something went wrong. :(', null, {duration: 4000, panelClass: 'snackbar-error'});
    });
  }

}
