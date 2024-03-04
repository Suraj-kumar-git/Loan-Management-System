import { Component } from '@angular/core';
import { Customer } from '../Model/Customer';
import { UserAuthService } from '../services/user-auth.service';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-customer',
  templateUrl: './account-customer.component.html',
  styleUrls: ['./account-customer.component.css']
})
export class AccountCustomerComponent {
  indianStates: string[] = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
    'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];
  customer = new Customer();
  editMode: boolean = false;
  constructor(private router: Router, private userAuthService: UserAuthService, private customerService: CustomerService) { }

  ngOnInit() {
    this.loadCustomerDetails();
  }
  loadCustomerDetails() {
    this.customer = this.userAuthService.getCustomer();
    console.log(this.customer);
  }
  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    console.log('Saving changes:', this.customer);
    this.toggleEditMode();

    this.customerService.updateAccount(this.customer).subscribe(
      (response) => {
        if (response) {
          this.userAuthService.setCustomer(this.customer);
          this.router.navigate(['home'])
        } else {
          alert("couldn't save changes");
        }
      },
    );
  }
}
