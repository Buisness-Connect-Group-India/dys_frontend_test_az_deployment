import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErpRoutingModule } from './erp-routing.module';
import { ErpPageComponent } from './pages/erp-page/erp-page.component';
import { TechnicianTableComponent } from './components/technician-master/technician-table/technician-table.component';
import { TechnicianFormComponent } from './components/technician-master/technician-form/technician-form.component';
import { EngineerTableComponent } from './components/engineer-master/engineer-table/engineer-table.component';
import { EngineerFormComponent } from './components/engineer-master/engineer-form/engineer-form.component';
import { NgZorroAntdModule } from '../../../../shared/ng-zorro-antd/ng-zorro-antd.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TaxFormComponent } from './components/tax-master/tax-form/tax-form.component';
import { TaxTableComponent } from './components/tax-master/tax-table/tax-table.component';
import { StateTableComponent } from './components/state-master/state-table/state-table.component';
import { StateFormComponent } from './components/state-master/state-form/state-form.component';
import { RetailerTableComponent } from './components/retailer-master/retailer-table/retailer-table.component';
import { RetailerFormComponent } from './components/retailer-master/retailer-form/retailer-form.component';
import { ProductsTableComponent } from './components/products-master/products-table/products-table.component';
import { ProductsFormComponent } from './components/products-master/products-form/products-form.component';
import { ProductLineFormComponent } from './components/product-line-master/product-line-form/product-line-form.component';
import { ProductLineTableComponent } from './components/product-line-master/product-line-table/product-line-table.component';
import { ProductGroupTableComponent } from './components/product-group-master/product-group-table/product-group-table.component';
import { ProductGroupFormComponent } from './components/product-group-master/product-group-form/product-group-form.component';
import { MasterUploadTableComponent } from './components/master-upload/master-upload-table/master-upload-table.component';
import { MasterUploadFormComponent } from './components/master-upload/master-upload-form/master-upload-form.component';
import { CountryTableComponent } from './components/country-master/country-table/country-table.component';
import { CountryFormComponent } from './components/country-master/country-form/country-form.component';
import { ContactCenterTableComponent } from './components/contact-center-master/contact-center-table/contact-center-table.component';
import { ContactCenterFormComponent } from './components/contact-center-master/contact-center-form/contact-center-form.component';
import { CityTableComponent } from './components/city-master/city-table/city-table.component';
import { CityFormComponent } from './components/city-master/city-form/city-form.component';
import { BrandTableComponent } from './components/brand-master/brand-table/brand-table.component';
import { BrandFormComponent } from './components/brand-master/brand-form/brand-form.component';
import { BranchTableComponent } from './components/branch-master/branch-table/branch-table.component';
import { BranchFormComponent } from './components/branch-master/branch-form/branch-form.component';
import { BranchGroupTableComponent } from './components/branch-group-master/branch-group-table/branch-group-table.component';
import { BranchGroupFormComponent } from './components/branch-group-master/branch-group-form/branch-group-form.component';
import { AreaMasterTableComponent } from './components/area-master/area-master-table/area-master-table.component';
import { AreaMasterFormComponent } from './components/area-master/area-master-form/area-master-form.component';
import { SpareItemTableComponent } from './components/spare-item-master/spare-item-table/spare-item-table.component';
import { SpareItemFormComponent } from './components/spare-item-master/spare-item-form/spare-item-form.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    ErpPageComponent,
    TechnicianTableComponent,
    TechnicianFormComponent,
    EngineerTableComponent,
    EngineerFormComponent,
    SpareItemTableComponent,
    SpareItemFormComponent,
    TaxFormComponent,
    TaxTableComponent,
    StateTableComponent,
    StateFormComponent,
    RetailerTableComponent,
    RetailerFormComponent,
    ProductsTableComponent,
    ProductsFormComponent,
    ProductLineFormComponent,
    ProductLineTableComponent,
    ProductGroupTableComponent,
    ProductGroupFormComponent,
    MasterUploadTableComponent,
    MasterUploadFormComponent,
    CountryTableComponent,
    CountryFormComponent,
    ContactCenterTableComponent,
    ContactCenterFormComponent,
    CityTableComponent,
    CityFormComponent,
    BrandTableComponent,
    BrandFormComponent,
    BranchTableComponent,
    BranchFormComponent,
    BranchGroupTableComponent,
    BranchGroupFormComponent,
    AreaMasterTableComponent,
    AreaMasterFormComponent
  ],
  imports: [
    CommonModule,
    ErpRoutingModule,
    SharedModule,
    NgZorroAntdModule
  ]
})
export class ErpModule { }
