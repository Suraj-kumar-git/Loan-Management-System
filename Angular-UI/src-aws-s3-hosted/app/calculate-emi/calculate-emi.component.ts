import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { LoanType } from '../Model/LoanType';
import { LoanTypeService } from '../services/loan-type.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculate-emi',
  templateUrl: './calculate-emi.component.html',
  styleUrls: ['./calculate-emi.component.css']
})
export class CalculateEmiComponent {
  constructor(private route:ActivatedRoute,private customerService:CustomerService, private router:Router,private formBuilder:FormBuilder){}
  selectedLoan!:LoanType;
  loanInterestRate!:number;
  loanTypes:LoanType[]=[];
  loanForm!:FormGroup;

  ngOnInit(): void {
    this.getLoanTypes();
  }

  updateManagementFees() {
    const selectedLoanType = this.selectedLoan;
    if (selectedLoanType) {
      const loanType = this.loanTypes.find(type => type.loanTypeName === selectedLoanType.loanTypeName);
      if (loanType) {
        console.log('Management Fees:', loanType.loanManagementFees);
      }
    }
  }
  

  getLoanTypes(){
    this.customerService.getAllLoanTypes().subscribe(
      (loanType)=>{
        this.loanTypes = loanType
      }
    );
  }
  // calculateEMI(loanTypeName: string) {
  //   this.router.navigate(['calculateEMI/',loanTypeName]);
  //  }

  submitForm(data:any){
    console.log(data.loanAmount+" "+ data.loanDuration+ " " + this.loanInterestRate);
    this.customerService.calculateEMI(data.loanAmount, data.loanDuration,data.loanInterest)
    .subscribe(
      (response)=>{
        alert("Your estimated emi will be: "+ response);
        this.router.navigate(['calculateEMI']);
        console.log(response);
      }
    );
  }
}
