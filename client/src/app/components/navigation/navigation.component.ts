import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {AuthGuard} from '../../guards/auth.guard';
import {IApiResponse} from "../../interfaces/apiResponse.interface";
import {IUser} from "../../interfaces/user.interface";

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
    this.authService.getProfile().subscribe( (response: IApiResponse<IUser>) => {
      this.userName = response.data.username;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

}
