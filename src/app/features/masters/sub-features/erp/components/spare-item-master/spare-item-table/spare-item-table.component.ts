import { Component } from '@angular/core';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { } from '../../engineer-master/engineer-form/engineer-form.component';
import { SpareItemFormComponent } from '../spare-item-form/spare-item-form.component';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { SpareItemGetDto, SpareItemPostDto } from '../models/spare-item.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpareItemService } from '../services/spare-item.service';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-spare-item-table',
  standalone: false,
  templateUrl: './spare-item-table.component.html',
  styleUrl: './spare-item-table.component.scss'
})
export class SpareItemTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  spareItems: SpareItemGetDto[] = [];
  originalSpareItem: SpareItemGetDto[] = [];
  filterPanelOpen = false;
  tableColumns: CustomColumn[] = [
    {
      name: 'Spare Item Code',
      key: 'spItemCode',
      value: 'spItemCode',
      width: 200,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.spItemCode.localeCompare(b.spItemCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.spItemCode)
    },
    {
      name: 'Spare Item Description',
      key: 'spItemDesc',
      value: 'spItemDesc',
      width: 200,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.spItemDesc.localeCompare(b.spItemDesc),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.spItemDesc)
    },
    {
      name: 'UOM',
      key: 'uom',
      value: 'uom',
      width: 200,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.uom.localeCompare(b.uom),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.uom)
    },
    {
      name: 'Product Line',
      key: 'prodTypeCode',
      value: 'prodTypeCode',
      width: 200,
      default: true,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodTypeCode.localeCompare(b.prodTypeCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodTypeCode)
    },
    {
      name: 'Stock Type',
      key: 'stockType',
      value: 'stockType',
      width: 200,
      default: true,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Minimum Order Quantity',
      key: 'minOrderQty',
      value: 'minOrderQty',
      width: 300,
      default: true,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.minOrderQty.localeCompare(b.minOrderQty),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.minOrderQty)
    },
    {
      name: 'Price',
      key: 'price',
      value: 'price',
      width: 200,
      default: true,
      originalIndex: 6,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.price.localeCompare(b.price),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.price)
    },
    {
      name: 'Cost',
      key: 'cost',
      value: 'cost',
      width: 200,
      default: true,
      originalIndex: 7,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.cost.localeCompare(b.cost),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.cost)
    },
    {
      name: 'Status',
      key: 'isActive',
      value: 'isActive',
      width: 200,
      default: false,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.isActive.localeCompare(b.isActive),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.isActive)
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
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];

  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    public columnCustomizerService: ColumnCustomizerService,
    private confirmationModalService: ConfirmationModalService,
    private messageService: NzMessageService,
    private spareItemService: SpareItemService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchSpareItems();
  }

  fetchSpareItems(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.spareItemService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res?.payload;
          this.originalSpareItem = data;
          this.spareItems = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching Spare item:', err)
    });
  }

  async deleteSpareItem(item: SpareItemGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.SPAREITEM];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.spareItemService.delete(item.spItemCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Spare item deleted successfully.');
            this.fetchSpareItems();
          } else {
            this.messageService.error(res.message || 'Failed to delete Spare item.');
          }
        },
        error: (err) => {
          console.error('Delete Spare item error:', err);
          this.messageService.error('An unexpected error occurred while deleting the Spare item.');
        }
      });
    }
  }

  openForm(type: OperationType, spareItemData?: SpareItemPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Spare Item',
      [OperationType.Edit]: 'Edit Spare Item',
      [OperationType.View]: 'Spare Item Information',
      [OperationType.MassUpload]: 'Spare Item Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : SpareItemFormComponent,
      nzData: {
        type,
        data: spareItemData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchSpareItems();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchSpareItems();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchSpareItems();
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