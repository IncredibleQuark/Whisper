import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() changedTab = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  changeTab() {
    this.changedTab.emit(true);
  }

  registerSubmit(registerForm) {
    this.authService.registerUser(registerForm.value).subscribe(data => {

      const emailCheck = 'Email taken';
      if (data['success']) {

        this.snackBar.open('Registered successfully, ', 'Login', {duration: 4000, panelClass: 'snackbar-success'});
        this.changeTab();

      } else if (data['msg'] === emailCheck) {

        this.snackBar.open('Email already taken', null, {duration: 4000, panelClass: 'snackbar-error'});
        registerForm.form.controls.email.status = 'INVALID';

      } else {

        this.snackBar.open('Register error :(', null, {duration: 4000, panelClass: 'snackbar-error'});
        registerForm.form.controls.email.status = 'INVALID';
        registerForm.form.controls.password.status = 'INVALID';
        registerForm.form.controls.username.status = 'INVALID';

      }

    }, (err) => {
      console.log(err);
      this.snackBar.open('Something went wrong. :(', null, {duration: 4000, panelClass: 'snackbar-error'});
    });
  }

}
