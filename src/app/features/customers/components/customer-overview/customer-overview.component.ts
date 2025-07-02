import { Component } from '@angular/core';
import { CustomerOverviewDto } from './models/customer-overview.model';
import { CustomerService } from '../customer/services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerOverviewService } from './services/customer-overview.service';

@Component({
  selector: 'app-customer-overview',
  standalone: false,
  templateUrl: './customer-overview.component.html',
  styleUrl: './customer-overview.component.scss'
})
export class CustomerOverviewComponent {
  customerId: string|undefined|null=null;
  customerOverview!: CustomerOverviewDto;

  constructor(private customerService: CustomerService,
     private activeRoute: ActivatedRoute,
    private customerOverviewService:CustomerOverviewService) {
    this.customerId = this.activeRoute.parent?.snapshot.paramMap.get('customerId');
    if (this.customerId) {
      this.fetchCustomerOverview(this.customerId);
    }
  }

  fetchCustomerOverview(customerId: string | number): void {
    this.customerOverviewService.getByCode(customerId).subscribe({
      next: (res: any) => {
        if (res?.status === 'SUCCESS' && res.payload) {
          this.customerOverview = res.payload[0];
        }
      },
      error: (err) => {
        console.error('Error fetching customer products:', err);
      }
    });
  }
}
