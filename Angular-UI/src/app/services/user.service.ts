import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Login } from '../Model/Login';
import { Observable } from 'rxjs';
import { Customer } from '../Model/Customer';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API="http://localhost:8080/api";

  requestHeader = new HttpHeaders({"No-Auth":"True"});

  constructor(private http:HttpClient,private userAuthService:UserAuthService) { }
endpoint:string = "";
  public login(loginRequest:Login){
    if(loginRequest.role === 'ADMIN'){
      this.endpoint=this.PATH_OF_API+"/admin";
    }else{
      this.endpoint=this.PATH_OF_API+"/customer";
    }
    return this.http.post(this.endpoint+"/login",loginRequest,{headers:this.requestHeader});
  }
  register(customerDTO: Customer, file: File): Observable<boolean> {
    const formData: FormData = new FormData();
    console.log("Inside register(): "+JSON.stringify(customerDTO));
    formData.append('register',JSON.stringify(customerDTO));
    formData.append('file', file);
    console.log("Form Data"+formData);
    return this.http.post<boolean>(this.PATH_OF_API+'/customer/register', formData,{headers:this.requestHeader});
  }

  public roleMatch(allowedRole: string):boolean{
    let isMatch=false;
    const userRole=this.userAuthService.getRole();
    if(userRole !=null && userRole){
      if(userRole ===allowedRole){
        isMatch=true;
      }
    }
    return isMatch;
  }
}
