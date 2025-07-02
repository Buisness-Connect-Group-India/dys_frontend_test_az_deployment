import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { CustomerTableComponent } from './components/customer/customer-table/customer-table.component';
import { NgZorroAntdModule } from '../../shared/ng-zorro-antd/ng-zorro-antd.module';
import { SharedModule } from '../../shared/shared.module';
import { CustomerOverviewComponent } from './components/customer-overview/customer-overview.component';
import { CustomerHistoryComponent } from './components/customer-history/customer-history.component';
import { CustomerConsentComponent } from './components/customer-consent/customer-consent.component';
import { CustomerDetailsComponentComponent } from './components/customer-details-component/customer-details-component.component';
import { CustomerAddressesTableComponent } from './components/customer-addresses/customer-addresses-table/customer-addresses-table.component';
import { CustomerAddressesFormComponent } from './components/customer-addresses/customer-addresses-form/customer-addresses-form.component';
import { CustomerProductsTableComponent } from './components/customer-products/customer-products-table/customer-products-table.component';
import { CustomerProductsFormComponent } from './components/customer-products/customer-products-form/customer-products-form.component';
import { CustomerFormComponent } from './components/customer/customer-form/customer-form.component';


@NgModule({
  declarations: [
    CustomerPageComponent,
    CustomerTableComponent,
    CustomerFormComponent,
    CustomerOverviewComponent,
    CustomerHistoryComponent,
    CustomerConsentComponent,
    CustomerDetailsComponentComponent,
    CustomerAddressesTableComponent,
    CustomerAddressesFormComponent,
    CustomerProductsTableComponent,
    CustomerProductsFormComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    CustomersRoutingModule,
  ]
})
export class CustomersModule { }
