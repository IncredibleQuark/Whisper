import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {

  userName: string;

  constructor(private authService: AuthService,
              private authGuard: AuthGuard,
              private router: Router) { }

  ngOnInit() {
    this.authService.getProfile().subscribe( profile => {
      this.userName = profile["user"]["username"];
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
