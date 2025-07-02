import { Component, OnInit } from '@angular/core';
import { ComplaintOverviewService } from './services/complaint-overview.service';
import { ComplaintOverviewGetDto } from './models/complaint-overview.model';
import { ActivatedRoute } from '@angular/router';

interface Panel {
  active: boolean;
  disabled: boolean;
  name: string;
  icon?: string;
}
@Component({
  selector: 'app-complaint-overview',
  standalone: false,
  templateUrl: './complaint-overview.component.html',
  styleUrl: './complaint-overview.component.scss'
})
export class ComplaintOverviewComponent implements OnInit {

  complaintId!: string;
  complaintOverview?: ComplaintOverviewGetDto;

  constructor(private complaintOverviewService: ComplaintOverviewService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activeRoute.parent?.params.subscribe(params => {
      this.complaintId = params['complaintId'];
      if (this.complaintId) {
        this.fetchComplaintOverview();
      }
    });
  }

  fetchComplaintOverview() {
    this.complaintOverviewService.getByCode(this.complaintId).subscribe({
      next: (res: any) => {
        if (res?.status === 'SUCCESS' && res.payload) {
          this.complaintOverview = res.payload;
        }
      },
      error: (err) => {
        console.error('Error fetching customer products:', err);
      }
    });
  }

}
