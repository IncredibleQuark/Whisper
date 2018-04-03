import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(loginForm) {
    this.authService.authenticateUser(loginForm.value).subscribe( data => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

}
