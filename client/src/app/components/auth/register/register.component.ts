import { Component, OnInit, Input } from '@angular/core';
import { NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  registerSubmit(registerForm: NgForm) {
    this.authService.registerUser(registerForm.value).subscribe(data => {
      console.warn(data);
    });
  }

}
