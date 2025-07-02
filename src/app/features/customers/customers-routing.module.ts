import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CustomerTableComponent } from './components/customer/customer-table/customer-table.component';
import { CustomerOverviewComponent } from './components/customer-overview/customer-overview.component';
import { CustomerHistoryComponent } from './components/customer-history/customer-history.component';
import { CustomerConsentComponent } from './components/customer-consent/customer-consent.component';
import { CustomerDetailsComponentComponent } from './components/customer-details-component/customer-details-component.component';
import { CustomerAddressesTableComponent } from './components/customer-addresses/customer-addresses-table/customer-addresses-table.component';
import { CustomerProductsTableComponent } from './components/customer-products/customer-products-table/customer-products-table.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerPageComponent,
    children: [
      { path: '', redirectTo: 'table', pathMatch: 'full' },
      { path: 'table', component: CustomerTableComponent },

      {
        path: ':customerId',
        component: CustomerDetailsComponentComponent, 
        children: [
          { path: '', redirectTo: 'customer-overview', pathMatch: 'full' },
          { path: 'customer-overview', component: CustomerOverviewComponent },
          { path: 'customer-history', component: CustomerHistoryComponent },
          { path: 'customer-addresses', component: CustomerAddressesTableComponent },
          { path: 'customer-products', component: CustomerProductsTableComponent },
          { path: 'customer-consent', component: CustomerConsentComponent }
        ]
      }
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
