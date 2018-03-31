import { Component, OnInit, Input } from '@angular/core';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  registerSubmit(form: NgForm) {
    console.warn(form.value);
  }

}
