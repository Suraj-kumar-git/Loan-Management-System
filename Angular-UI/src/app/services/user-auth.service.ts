import { Injectable } from '@angular/core';
import { Customer } from '../Model/Customer';
import { Admin } from '../Model/admin';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRole(role: string) {
    localStorage.setItem("role",role);
  }

  public getRole(){
    return localStorage.getItem("role");
  }

  public setToken(token:string) {
    localStorage.setItem("token",token);
  }

  public getToken(): string {
    return localStorage.getItem("token") ?? '';
  }  

  public setTokenExpiresIn(expiresIn:number){
    const tokenExpirationTime=new Date().getTime() +1000*60*expiresIn;
    localStorage.setItem("tokenExpiresIn",tokenExpirationTime.toString());
  }

  isTokenExpired(): boolean {
    const tokenExpiration = localStorage.getItem('tokenExpiresIn');
    if (!tokenExpiration) {
      return false;
    }
    const expirationTime = parseInt(tokenExpiration, 10);
    if (isNaN(expirationTime)) {
      console.error('Invalid token expiration time:', tokenExpiration);
      return true;
    }
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }
  
  
  

  public clearToken(){
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getRole();
    return token !== null && role !== null;
  }
  public setCustomer(customer:Customer){
    localStorage.setItem('customer',JSON.stringify(customer));
  }

  public getCustomer():any{
    const customer = localStorage.getItem('customer');
    if(customer == null){
      throw new Error('customer not found');
    }
    return JSON.parse(customer);
  }
  public setAdmin(admin:Admin){
    localStorage.setItem('admin',JSON.stringify(admin));
  }

  public getAdmin():any{
    const admin = localStorage.getItem('admin');
    if(admin == null){
      throw new Error('customer not found');
    }
    return JSON.parse(admin);
  }
  
}
