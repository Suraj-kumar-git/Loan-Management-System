import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoanType } from '../Model/LoanType';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-home-customer',
  templateUrl: './home-customer.component.html',
  styleUrls: ['./home-customer.component.css']
})
export class HomeCustomerComponent implements OnInit{

  loanTypeList:LoanType[] = [];
  constructor(private customerService:CustomerService, private router:Router){}
  ngOnInit(): void {
    this.customerGetLoanType();
  }
  customerGetLoanType(){
    this.customerService.getAllLoanTypes().subscribe(
      (loanType)=>{
        this.loanTypeList = loanType;
      }
    );
  }
  applyLoan(loanTypeName:string) {
    this.router.navigate(['customer/apply-loan',loanTypeName])
  }

  // calculateEMI(loanTypeName: string) {
  //   this.router.navigate(['calculateEMI/',loanTypeName]);
  //  }

   updateLoan(loanId:number){
    console.log(loanId);
    this.router.navigate(['customer/update-applied-loan',loanId])
  }
}