import { Component } from '@angular/core';
import { Login } from '../Model/Login';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UserAuthService } from '../services/user-auth.service';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userAuthService: UserAuthService, private userService: UserService, private router: Router) {
    this.userAuthService.clearToken();
  }

  role: string = "";

  doLogin(loginData: Login) {
    this.role = loginData.role;
    if ((this.role === "ADMIN" && !loginData.username.endsWith("@hexaware.com")) || (this.role === "USER" && loginData.username.endsWith("@hexaware.com"))) {
      alert("Wrong Credentials Entered for "+this.role);
      return;
    }

    this.userService.login(loginData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          alert("Wrong Credentials for " + this.role);
        } else if (error.status === 403) {
          alert("Wrong Credentials");
        } else {
          alert("An error occurred. Please try again later.");
        }
        return throwError(error);
      })
    ).subscribe((response: any) => {
      console.log(response);
      this.userAuthService.setToken(response.jwtToken);
      if (this.role === "ADMIN" && loginData.username.endsWith("@hexaware.com")) {
        this.userAuthService.setAdmin(response.admin);
        this.userAuthService.setRole(response.admin.role);
        this.userAuthService.setTokenExpiresIn(60);
        this.router.navigate(['admin/home']);
      }
      if (this.role === "USER" && !loginData.username.endsWith("@hexaware.com")) {
        this.userAuthService.setRole(response.customer.role);
        this.userAuthService.setCustomer(response.customer);
        this.userAuthService.setTokenExpiresIn(60);
        this.router.navigate(['customer/home']);
      }
    });
  }
}
