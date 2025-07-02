import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { MasterPageComponent } from './pages/master-page/master-page.component';
import { CommonCodeTableComponent } from './components/common-code/common-code-table/common-code-table.component';

const routes: Routes = [
  {
    path: '', component: MasterPageComponent,
    children: [
      {
        path: 'erp',
        loadChildren: () => import('../masters/sub-features/erp/erp.module').then((m) => m.ErpModule),
        canActivate: [AuthGuard]
      },
      {
         path:'common-master',
         component:CommonCodeTableComponent

      },
      {
        path: 'tech-scheduling',
        loadChildren: () => import('../masters/sub-features/tech-scheduling/tech-scheduling.module').then((m) => m.TechSchedulingModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
