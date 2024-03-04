import { Component, OnInit } from '@angular/core';
import { Admin } from '../Model/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.css']
})
export class AllAdminsComponent implements OnInit {
  admins: Admin[] = [];
  tempAdmins: Admin[] = [];
  searchValue: string = '';
  searchPerformed: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.adminService.getAllAdmins().subscribe(admins => {
      this.admins = admins;
      this.tempAdmins = admins;
    });
  }

  onSearch() {
    this.searchValue = this.searchValue.trim().toLowerCase();
    if (this.searchValue) {
      this.tempAdmins = this.admins.filter(admin => {
        if (!isNaN(Number(this.searchValue))) {
          return admin.adminId.toString().includes(this.searchValue);
        } else {
          return (
            admin.adminFirstName.toLowerCase().includes(this.searchValue) ||
            admin.adminLastName.toLowerCase().includes(this.searchValue) ||
            admin.email.toLowerCase().includes(this.searchValue)
          );
        }
      });
    } else {
      this.tempAdmins = this.admins;
    }
    this.searchPerformed = true;
  }
}
