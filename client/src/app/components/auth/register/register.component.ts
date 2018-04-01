import { Component, OnInit, Input } from '@angular/core';
import { NgForm} from '@angular/forms';
import {RegisterService} from '../../../services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private register: RegisterService) { }

  ngOnInit() {
  }

  registerSubmit(form: NgForm) {
    this.register.registerUser(form.value).subscribe(data => {
      console.warn(data);
    });
  }

}
