import { Component } from '@angular/core';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { TaxFormComponent } from '../tax-form/tax-form.component';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { TaxGetDto, TaxPostDto } from '../models/tax.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaxService } from '../services/tax.service';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-tax-table',
  standalone: false,
  templateUrl: './tax-table.component.html',
  styleUrl: './tax-table.component.scss'
})
export class TaxTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  taxes: TaxGetDto[] = []
  originalTaxes: TaxGetDto[] = [];
  filterPanelOpen = false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  //   id: string;
  tableColumns: CustomColumn[] = [
    {
      name: 'Tax Number',
      key: 'taxNo',
      value: 'taxNo',
      width: 150,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.taxNo.localeCompare(b.taxNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.taxNo)
    },
    {
      name: 'Tax Label',
      key: 'taxLabel',
      value: 'taxLabel',
      width: 150,
      default: true,
      originalIndex: 12,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.taxLabel.localeCompare(b.taxLabel),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.taxLabel)
    },
    {
      name: 'Tax Percent',
      key: 'taxPercent',
      value: 'taxPercent',
      width: 150,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.taxPerc.localeCompare(b.taxPerc),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.taxPerc)
    },
    {
      name: 'Branch',
      key: 'branchCode',
      value: 'branchCode',
      width: 150,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.branchCode.localeCompare(b.branchCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.branchCode)
    },
    {
      name: 'From Date',
      key: 'fromDate',
      value: 'fromDate',
      width: 150,
      default: true,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.fromDate.localeCompare(b.fromDate),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.fromDate)
    },
    {
      name: 'To Date',
      key: 'toDate',
      value: 'toDate',
      width: 150,
      default: true,
      originalIndex: 6,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.toDate.localeCompare(b.toDate),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.toDate)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 200,
      default: false,
      originalIndex: 2,
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
      originalIndex: 3,
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
    public columnCustomizerService: ColumnCustomizerService,
    private confirmationModalService: ConfirmationModalService,
    private messageService: NzMessageService,
    private taxService: TaxService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchTax();
  }

  fetchTax(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.taxService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalTaxes = data;
          this.taxes = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching tax:', err)
    });
  }

  async deleteTax(item: TaxGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.TAX];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.taxService.delete(item.id).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Tax deleted successfully.');
            this.fetchTax();
          } else {
            this.messageService.error(res.message || 'Failed to delete tax.');
          }
        },
        error: (err) => {
          console.error('Delete tax error:', err);
          this.messageService.error('An unexpected error occurred while deleting the tax.');
        }
      });
    }
  }

  openForm(type: OperationType, taxData?: TaxPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Tax',
      [OperationType.Edit]: 'Edit Tax',
      [OperationType.View]: 'Tax Information',
      [OperationType.MassUpload]: 'Tax Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : TaxFormComponent,
      nzData: {
        type,
        data: taxData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchTax();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchTax();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchTax();
  }

  handleSearchChange(): void {
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