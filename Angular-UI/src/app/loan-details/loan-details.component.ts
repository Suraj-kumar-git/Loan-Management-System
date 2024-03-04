import { Component } from '@angular/core';
import { LoanApplications } from '../Model/LoanApplications';
import { LoanService } from '../services/loan.service';

@Component({
  selector: 'app-loan-details',
  templateUrl: './loan-details.component.html',
  styleUrls: ['./loan-details.component.css']
})
export class LoanDetailsComponent {
  loan!: LoanApplications;

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    // Load loan details here
  }

  onActionChange(status: string, loanId: number) {
    this.loanService.updateLoanStatus(loanId, status)
      .subscribe(() => {
        // Update loan status in the UI if needed
      });
  }
}
