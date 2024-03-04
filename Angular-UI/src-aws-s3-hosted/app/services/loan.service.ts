import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  PATH_OF_API:string="http://suraj-palash-backend-lms.us-east-1.elasticbeanstalk.com/api/admin";
  constructor(private http: HttpClient,private userAuthService: UserAuthService) { }

  updateLoanStatus(loanId: number, newStatus: string){
    let token = this.userAuthService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url=`${this.PATH_OF_API}/update-customer-loan-status/${loanId}/${newStatus}`;
    return this.http.put(url, {}, { headers });
  }
}
