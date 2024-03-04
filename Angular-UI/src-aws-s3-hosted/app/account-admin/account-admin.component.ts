import { Component } from '@angular/core';
import { Admin } from '../Model/admin';
import { UserAuthService } from '../services/user-auth.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css']
})
export class AccountAdminComponent {
  admin: Admin = new Admin();
  editMode: boolean = false;

  constructor(private userAuthService: UserAuthService,private adminService: AdminService) { }
  

  ngOnInit(): void {
    this.loadAdminDetails();
  }

  loadAdminDetails() {
    this.admin.adminId = this.userAuthService.getAdmin().adminId;
    this.admin.adminFirstName = this.userAuthService.getAdmin().adminFirstName;;
    this.admin.adminLastName = this.userAuthService.getAdmin().adminLastName;
    this.admin.email = this.userAuthService.getAdmin().email;
    this.admin.password = '********';
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveChanges() {
    console.log('Saving changes:', this.admin);
    if(this.admin.password.length<8){
      alert("Password must be atleast 8 characters long")
    }
    this.adminService.updateAccount(this.admin).subscribe((status)=>{
      if(status ===true){
        alert("Account updated successfully");
        this.userAuthService.setAdmin(this.admin);
      }else{
        alert("Account not updated,Something went wrong");
      }
    });
    this.toggleEditMode();
  }
}
