import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/components/confirmation-modal/confirmation-modal.component';
import { NgZorroAntdModule } from './ng-zorro-antd/ng-zorro-antd.module';
import { BulkUploadComponent } from './bulk-upload/components/bulk-upload/bulk-upload.component';
import { AsteriskDirective } from './directives/asterisk.directive';
import { ColumnCustomizerComponent } from './column-settings/components/column-customizer/column-customizer.component';
import { PaginationFooterComponent } from './pagination-footer/components/pagination-footer/pagination-footer.component';
import { DynamicDropdownComponent } from './dynamic-dropdown/components/dynamic-dropdown/dynamic-dropdown.component';
import { DynamicFilterComponent } from './dynamic-filter/components/dynamic-filter/dynamic-filter.component';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    BulkUploadComponent,
    AsteriskDirective,
    ColumnCustomizerComponent,
    PaginationFooterComponent,
    DynamicDropdownComponent,
    DynamicFilterComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule
  ],
  exports: [
    ConfirmationModalComponent,
    BulkUploadComponent,
    AsteriskDirective,
    ColumnCustomizerComponent,
    DynamicDropdownComponent,
    DynamicFilterComponent,
    PaginationFooterComponent
  ],
})
export class SharedModule { }
