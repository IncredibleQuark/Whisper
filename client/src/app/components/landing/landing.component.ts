import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  private loginSelected: boolean;
  private registerSelected: boolean;

  constructor() { }

  ngOnInit() {
    this.loginSelected = true;
    this.registerSelected = false;
  }


  selectLoginForm() {
    this.loginSelected = true;
    this.registerSelected = false;
  }

  selectRegisterForm() {
    this.loginSelected = false;
    this.registerSelected = true;
  }

}
