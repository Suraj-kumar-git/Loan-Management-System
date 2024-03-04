import { Component } from '@angular/core';
import { Customer } from '../Model/Customer';
import { CustomerService } from '../services/customer.service';
import { NgFor } from '@angular/common';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent {

  customers: Customer[] = [];
  tempCustomer: Customer[] = [];
  searchValue: string = '';
  searchPerformed: boolean = false;

  constructor(private customerService: CustomerService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  onSearch() {
    this.searchValue = this.searchValue.trim().toLowerCase();
    if (this.searchValue) {
      this.tempCustomer = this.customers.filter(customer =>
        (customer.customerFirstName.toLowerCase().includes(this.searchValue) ||
          customer.customerLastName.toLowerCase().includes(this.searchValue) ||
          customer.email.toLowerCase().includes(this.searchValue) ||
          customer.fullAddress.toLowerCase().includes(this.searchValue))
      );
    } else {
      this.tempCustomer = this.customers;
    }
    this.searchPerformed = true;
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(customers => {
      console.log(customers);
      this.customers = customers.map(customer => {
        const fullName = `${customer.customerFirstName} ${customer.customerLastName}`;
        const age = this.calculateAge(customer.dateOfBirth);
        const idProofName = `${customer.idProofFile.fileName}`;
        const customerProofId = customer.idProofFile.customerProofId;
        const fullAddress = `${customer.address}, ${customer.state}, ${customer.country}`;

        return {
          ...customer,
          fullName,
          age,
          idProofName,
          customerProofId,
          fullAddress
        };
      });
      // Load customers into tempCustomer initially
      this.tempCustomer = this.customers;
    });
  }

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  downloadCustomerIdFile(customerProofId: number, idProofName: string) {
    this.adminService.downloadCustomerIdFile(customerProofId, idProofName);
  }

}

