import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianTableComponent } from './components/technician-master/technician-table/technician-table.component';
import { EngineerTableComponent } from './components/engineer-master/engineer-table/engineer-table.component';
import { ErpPageComponent } from './pages/erp-page/erp-page.component';
import { SpareItemTableComponent } from './components/spare-item-master/spare-item-table/spare-item-table.component';
import { ProductsTableComponent } from './components/products-master/products-table/products-table.component';
import { ProductGroupTableComponent } from './components/product-group-master/product-group-table/product-group-table.component';
import { ProductLineTableComponent } from './components/product-line-master/product-line-table/product-line-table.component';
import { BranchTableComponent } from './components/branch-master/branch-table/branch-table.component';
import { CountryTableComponent } from './components/country-master/country-table/country-table.component';
import { StateTableComponent } from './components/state-master/state-table/state-table.component';
import { CityTableComponent } from './components/city-master/city-table/city-table.component';
import { BrandTableComponent } from './components/brand-master/brand-table/brand-table.component';
import { BranchGroupTableComponent } from './components/branch-group-master/branch-group-table/branch-group-table.component';
import { AreaMasterTableComponent } from './components/area-master/area-master-table/area-master-table.component';
import { RetailerTableComponent } from './components/retailer-master/retailer-table/retailer-table.component';
import { TaxTableComponent } from './components/tax-master/tax-table/tax-table.component';
import { ContactCenterTableComponent } from './components/contact-center-master/contact-center-table/contact-center-table.component';
import { MasterUploadTableComponent } from './components/master-upload/master-upload-table/master-upload-table.component';

const routes: Routes = [
  {
    path: '', component: ErpPageComponent,
    children: [
      {
        path: 'technician', component: TechnicianTableComponent
      },
      {
        path: 'engineer', component: EngineerTableComponent
      },
      {
        path:'spare-item',component:SpareItemTableComponent
      },
      {
        path:'products', component:ProductsTableComponent
      },
      {
        path:'product-group', component:ProductGroupTableComponent
      },
      {
        path:'product-line', component:ProductLineTableComponent
      },
      {
        path:'brand', component:BrandTableComponent
      },
      {
        path:'country', component:CountryTableComponent
      },
      {
        path:'state', component:StateTableComponent
      },
      {
        path:'city', component:CityTableComponent
      },
      {
        path:'branch', component:BranchTableComponent
      },
      {
        path:'branch-group', component:BranchGroupTableComponent
      },
      {
        path:'area', component:AreaMasterTableComponent
      },
      {
        path:'retailer', component:RetailerTableComponent
      },
      {
        path:'tax-master', component:TaxTableComponent
      },
      {
        path:'contact-center', component:ContactCenterTableComponent
      },
      {
        path:'master-upload', component:MasterUploadTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErpRoutingModule { }
