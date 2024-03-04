import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
// import { JwtServiceService } from '../services/jwt-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router:Router,private userAuthService: UserAuthService,private userService: UserService) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
  get isLoggedIn():boolean{
    return this.userAuthService.isLoggedIn();
  }

  public userRole(){
    return this.userAuthService.getRole();
  }

  public logout(){
    this.userAuthService.clearToken();
    this.router.navigate(['home']);
  }

  notifications = [
    { id: 1, message: 'Notification 1', read: false },
    { id: 2, message: 'Notification 2', read: true },
    { id: 3, message: 'Notification 3', read: false },
    { id: 4, message: 'Notification 3', read: false }
  ];

}
