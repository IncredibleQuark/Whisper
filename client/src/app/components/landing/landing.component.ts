import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  private loginSelected: boolean;
  private registerSelected: boolean;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/main']);
    }
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
