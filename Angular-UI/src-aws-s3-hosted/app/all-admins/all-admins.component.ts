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
      console.log(admins);
      this.admins = admins.map(admin => {
        const fullName = `${admin.adminFirstName} ${admin.adminLastName}`;
        const profileImage = admin.profileImage;
        if (profileImage) {
          const imageData = admin.image;
          let format = 'jpeg';
          if (profileImage.toLowerCase().endsWith('.jpeg')) {
            format = 'jpeg';
          } else if (profileImage.toLowerCase().endsWith('.jpg')) {
            format = 'jpg';
          } else if (profileImage.toLowerCase().endsWith('.png')) {
            format = 'png';
          }
          admin.image = this.getImageUrl(imageData, format);
        }
        return {
          ...admin,
          fullName,
        };
      });
      this.tempAdmins = this.admins;
    });
  }
  getImageUrl(base64String: string, format: string): string {
    return `data:image/${format};base64,${base64String}`;
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
