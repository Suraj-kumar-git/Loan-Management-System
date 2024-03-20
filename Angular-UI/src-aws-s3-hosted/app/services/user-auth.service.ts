import { Injectable } from '@angular/core';
import { Customer } from '../Model/Customer';
import { Admin } from '../Model/admin';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private router: Router) { }

  public setRole(role: string) {
    localStorage.setItem("role", role);
  }

  public getRole() {
    return localStorage.getItem("role");
  }

  public setToken(token: string) {
    localStorage.setItem("token", token);
  }

  public getToken(): string {
    return localStorage.getItem("token") ?? '';
  }

  public setTokenExpiresIn(expiresIn: number) {
    const tokenExpirationTime = new Date().getTime() + 1000 * 60 * expiresIn;
    localStorage.setItem("tokenExpiresIn", tokenExpirationTime.toString());
  }

  isTokenExpired(): boolean {
    const tokenExpiration = localStorage.getItem('tokenExpiresIn') ?? 'No Token Available';
    const expirationTime = parseInt(tokenExpiration, 10);
    if (isNaN(expirationTime)) {
      console.error('Invalid token expiration time:', tokenExpiration);
      this.router.navigate(['/home']);
    }
    const currentTime = new Date().getTime();
    return expirationTime < currentTime;
  }
  public clearToken() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    const role = this.getRole();
    return token !== null && role !== null;
  }
  public setCustomer(customer: Customer) {
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  public setCustomerProfileImage(profileImage: string) {
    let customerString: string | null = localStorage.getItem('customer');
    if (customerString) {
      let customer: Customer = JSON.parse(customerString);
      customer.profileImage = profileImage;
      localStorage.setItem('customer', JSON.stringify(customer));
    }
  }
  public setAdminProfileImage(profileImage: string) {
    let adminString: string | null = localStorage.getItem('admin');
    if (adminString) {
      let admin: Admin = JSON.parse(adminString);
      admin.profileImage = profileImage;
      localStorage.setItem('admin', JSON.stringify(admin));
    }
  }

  public getCustomer(): any {
    const customer = localStorage.getItem('customer');
    if (customer == null) {
      throw new Error('customer not found');
    }
    return JSON.parse(customer);
  }
  public setAdmin(admin: Admin) {
    localStorage.setItem('admin', JSON.stringify(admin));
  }

  public getAdmin(): any {
    const admin = localStorage.getItem('admin');
    if (admin == null) {
      throw new Error('customer not found');
    }
    return JSON.parse(admin);
  }

  setAdminProfileImageData(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageDataUrl = reader.result?.toString().split(',')[1];
      let adminString: string | null = localStorage.getItem('admin');
      if (adminString) {
        let admin: Admin = JSON.parse(adminString);
        if (imageDataUrl) {
          admin.image = imageDataUrl;
          localStorage.setItem('admin', JSON.stringify(admin));
        }
      };
    }
  }

  setCustomerProfileImageData(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageDataUrl = reader.result?.toString().split(',')[1];
      let customerString: string | null = localStorage.getItem('customer');
      if (customerString) {
        let customer: Customer = JSON.parse(customerString);
        if (imageDataUrl) {
          customer.image = imageDataUrl;
          localStorage.setItem('customer', JSON.stringify(customer));
        }
      };
    }
  }


  }
