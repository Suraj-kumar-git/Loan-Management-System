import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthService } from "../services/user-auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userAuthService: UserAuthService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get("No-Auth") == "True") {
      return next.handle(req.clone());
    }
    const token: string = this.userAuthService.getToken();
    this.addToken(req, token);
    return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/login']);
          } else if (error.status === 403) {
            this.router.navigate(['/forbidden'])
          }
          return throwError("Something went wrong");
        }
      )
    );
  }
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
  }

}