import { Component } from '@angular/core';
import { BrandFormComponent } from '../brand-form/brand-form.component';
import { FormBuilder } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { BrandGetDto, BrandPostDto } from '../models/brand.model';
import { BrandService } from '../services/brand.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-brand-table',
  standalone: false,
  templateUrl: './brand-table.component.html',
  styleUrl: './brand-table.component.scss'
})
export class BrandTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  brands: BrandGetDto[] = [];
  filterPanelOpen = false;
  originalBrands: BrandGetDto[] = [];
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Brand Code',
      key: 'brandCode',
      value: 'brandCode',
      width: 150,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.brandCode.localeCompare(b.brandCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.brandCode)
    },
    {
      name: 'Brand Description',
      key: 'brandDesc',
      value: 'brandDesc',
      width: 150,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 200,
      default: false,
      originalIndex: 12,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedBy.localeCompare(b.updatedBy),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedBy)
    },
    {
      name: 'Updated On',
      key: 'updatedOn',
      value: 'updatedOn',
      width: 200,
      default: false,
      originalIndex: 12,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedOn.localeCompare(b.updatedOn),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedOn)
    }
  ];
  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    private fb: FormBuilder,
    private brandService: BrandService,
    private messageService: NzMessageService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchBrands();
  }

  fetchBrands(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.brandService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalBrands = data;
          this.brands = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching cities:', err)
    });
  }

  async deleteBrand(item: BrandGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.BRAND];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.brandService.delete(item.brandCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Brand deleted successfully.');
            this.fetchBrands();
          } else {
            this.messageService.error(res.message || 'Failed to delete brand.');
          }
        },
        error: (err) => {
          console.error('Delete brand error:', err);
          this.messageService.error('An unexpected error occurred while deleting the brand.');
        }
      });
    }
  }

  openForm(type: OperationType, brandData?: BrandPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Brand',
      [OperationType.Edit]: 'Edit Brand',
      [OperationType.View]: ' Brand Information',
      [OperationType.MassUpload]: 'Brand Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '30%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : BrandFormComponent,
      nzData: {
        type,
        data: brandData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchBrands();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchBrands();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchBrands();
  }

  handleSearchChange(): void {
    const query = this.searchValue.toLowerCase().trim();
  }

  exportAs(format: 'PDF' | 'EXCEL'): void {
    console.log(`Exporting as ${format}`);
  }

  toggleFilterPanel(): void {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  applyFilter(filters: any) {
    console.log('Filtered Data:', filters);
  }
}