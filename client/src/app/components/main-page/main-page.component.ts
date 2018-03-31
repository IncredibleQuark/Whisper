import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

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
