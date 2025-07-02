import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-details-component',
  standalone: false,
  templateUrl: './customer-details-component.component.html',
  styleUrl: './customer-details-component.component.scss'
})
export class CustomerDetailsComponentComponent {
  customerId: string | null = '';
  selectedTabIndex = 0;
  selectedTabLabel = 'Overview';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('customerId');

    // Determine selectedTabIndex from the current route
    const currentRoute = this.route.firstChild?.snapshot.url[0]?.path;
    this.selectedTabIndex = this.getTabIndexFromRoute(currentRoute);
    this.selectedTabLabel = this.getTabLabelFromIndex(this.selectedTabIndex);
  }

  // Desktop tab click
  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    this.selectedTabLabel = this.getTabLabelFromIndex(index);
    this.navigateToTab(index);
  }

  // Mobile dropdown click
  selectTab(index: number, label: string): void {
    this.selectedTabIndex = index;
    this.selectedTabLabel = label;
    this.navigateToTab(index);
  }

  private navigateToTab(index: number): void {
    const tabRoutes = [
      'customer-overview',
      'customer-history',
      'customer-addresses',
      'customer-products',
      'customer-consent'
    ];

    const route = tabRoutes[index];
    this.router.navigate([route], { relativeTo: this.route });
  }

  private getTabIndexFromRoute(path: string | undefined): number {
    switch (path) {
      case 'customer-overview': return 0;
      case 'customer-history': return 1;
      case 'customer-addresses': return 2;
      case 'customer-products': return 3;
      case 'customer-consent': return 4;
      default: return 0;
    }
  }

  private getTabLabelFromIndex(index: number): string {
    return ['Overview', 'History', 'Addresses', 'Products', 'Consent'][index];
  }
}
