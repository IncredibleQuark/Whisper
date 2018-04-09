import { Component, OnInit, Input } from '@angular/core';
import { NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  registerSubmit(registerForm: NgForm) {
    this.authService.registerUser(registerForm.value).subscribe(data => {
      this.router.navigate(['']);
    });
  }

}
