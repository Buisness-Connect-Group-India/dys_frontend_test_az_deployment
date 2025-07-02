import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '',
  },
  {
    path: '',
    loadChildren: () => import('../app/features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/features/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('../app/features/customers/customers.module').then((m) => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'masters',
    loadChildren: () => import('../app/features/masters/masters.module').then((m) => m.MastersModule),
    canActivate: [AuthGuard]
  },
  {
    path:'customer-complaint-management',
    loadChildren:()=> import('../app/features/customer-complaint-management/customer-complaint-management.module').then((m)=>m.CustomerComplaintManagementModule),
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
