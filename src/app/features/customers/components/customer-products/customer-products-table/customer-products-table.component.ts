import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

import { CONFIRMATION_MODAL_CONTENT } from '../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { CustomColumn } from '../../../../../shared/column-settings/models/custom-column.model';
import { ColumnCustomizerService } from '../../../../../shared/column-settings/services/column-customizer.service';
import { ConfirmationModalService } from '../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../shared/services/shared.service';
import { CustomerProductsFormComponent } from '../customer-products-form/customer-products-form.component';
import { PaginationService } from '../../../../../shared/pagination-footer/services/pagination.service';
import { PaginationState } from '../../../../../shared/pagination-footer/models/pagination.model';
import { CustomerProductsGetDto } from '../models/customer-products.model';
import { ProductsService } from '../../../../masters/sub-features/erp/components/products-master/services/products.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerProductsService } from '../services/customer-products.service';
import { DynamicFilterField } from '../../../../../shared/dynamic-filter/models/dynamic-filter.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-products-table',
  standalone: false,
  templateUrl: './customer-products-table.component.html',
  styleUrl: './customer-products-table.component.scss'
})
export class CustomerProductsTableComponent {
  OperationType = OperationType;
  customerId: any;
  searchValue: string = '';
  pagination: PaginationState;
  filterValue: string | null = null;
  filterPanelOpen = false;
  originalCustomerProducts: CustomerProductsGetDto[] = [];
  customerProducts: CustomerProductsGetDto[] = [];
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  searchVisible: boolean = false;
  tableColumns: CustomColumn[] = [
    {
      name: 'Product ID',
      key: 'prodId',
      value: 'prodId',
      width: 200,
      default: false,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodId.localeCompare(b.prodId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodId)
    },
    {
      name: 'Replacement Product ID',
      key: 'repProdId',
      value: 'repProdId',
      width: 200,
      default: false,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.repProdId.localeCompare(b.repProdId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.repProdId)
    },
    {
      name: 'Source Product ID',
      key: 'sourceProdId',
      value: 'sourceProdId',
      width: 200,
      default: false,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.sourceProdId.localeCompare(b.sourceProdId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.sourceProdId)
    },
    {
      name: 'Customer ID',
      key: 'custId',
      value: 'custId',
      width: 200,
      default: false,
      originalIndex: 3,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.custId.localeCompare(b.custId),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.custId)
    },
    {
      name: 'Product Type Code',
      key: 'prodTypeCode',
      value: 'prodTypeCode',
      width: 200,
      default: false,
      originalIndex: 4,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodTypeCode.localeCompare(b.prodTypeCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodTypeCode)
    },
    {
      name: 'Item Category',
      key: 'prodGrpCode',
      value: 'prodGrpCode',
      width: 200,
      default: false,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodGrpCode.localeCompare(b.prodGrpCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodGrpCode)
    },
    {
      name: 'Brand Code',
      key: 'brandCode',
      value: 'brandCode',
      width: 200,
      default: true,
      originalIndex: 6,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.brandCode.localeCompare(b.brandCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.brandCode)
    },
    {
      name: 'Product Code',
      key: 'prodCode',
      value: 'prodCode',
      width: 200,
      default: true,
      originalIndex: 7,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodCode.localeCompare(b.prodCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodCode)
    },
    {
      name: 'Model Code',
      key: 'alienModel',
      value: 'alienModel',
      width: 200,
      default: true,
      originalIndex: 8,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.alienModel.localeCompare(b.alienModel),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.alienModel)
    },
    {
      name: 'Purchase Date',
      key: 'purcDate',
      value: 'purcDate',
      width: 200,
      default: true,
      originalIndex: 9,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.purcDate.localeCompare(b.purcDate),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.purcDate)
    },
    {
      name: 'MAC Serial Number',
      key: 'macSrNo',
      value: 'macSrNo',
      width: 200,
      default: true,
      originalIndex: 10,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.macSrNo.localeCompare(b.macSrNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.macSrNo)
    },
    {
      name: 'Model Description',
      key: 'modelDesc',
      value: 'modelDesc',
      width: 200,
      default: false,
      originalIndex: 11,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.modelDesc.localeCompare(b.modelDesc),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.modelDesc)
    },
    {
      name: 'Product Verified',
      key: 'prodVerified',
      value: 'prodVerified',
      width: 200,
      default: false,
      originalIndex: 12,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodVerified.localeCompare(b.prodVerified),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodVerified)
    },
    {
      name: 'Retailer Code',
      key: 'retailerCode',
      value: 'retailerCode',
      width: 200,
      default: false,
      originalIndex: 13,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.retailerCode.localeCompare(b.retailerCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.retailerCode)
    },
    {
      name: 'Batch Number',
      key: 'batchNo',
      value: 'batchNo',
      width: 200,
      default: false,
      originalIndex: 14,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.batchNo.localeCompare(b.batchNo),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.batchNo)
    },
    {
      name: 'Product Registration Time',
      key: 'prodRegTime',
      value: 'prodRegTime',
      width: 200,
      default: false,
      originalIndex: 15,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodRegTime.localeCompare(b.prodRegTime),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodRegTime)
    },
    {
      name: 'Sync To CRM',
      key: 'syncToCrm',
      value: 'syncToCrm',
      width: 200,
      default: false,
      originalIndex: 16,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.syncToCrm.localeCompare(b.syncToCrm),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.syncToCrm)
    },
    {
      name: 'Status',
      key: 'status',
      value: 'status',
      width: 200,
      default: true,
      originalIndex: 17,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.status)
    },
    {
      name: 'Replacement Reference',
      key: 'repRefernce',
      value: 'repRefernce',
      width: 200,
      default: false,
      originalIndex: 18,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.repRefernce.localeCompare(b.repRefernce),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.repRefernce)
    },
    {
      name: 'Registered By Entity',
      key: 'regByEnt',
      value: 'regByEnt',
      width: 200,
      default: false,
      originalIndex: 19,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.regByEnt.localeCompare(b.regByEnt),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.regByEnt)
    },
    {
      name: 'Updated On',
      key: 'updatedOn',
      value: 'updatedOn',
      width: 200,
      default: true,
      originalIndex: 20,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedOn.localeCompare(b.updatedOn),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedOn)
    },
    {
      name: 'Updated By',
      key: 'updatedBy',
      value: 'updatedBy',
      width: 200,
      default: false,
      originalIndex: 21,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.updatedBy.localeCompare(b.updatedBy),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.updatedBy)
    }
  ];


  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    private confirmationModalService: ConfirmationModalService,
    public columnCustomizerService: ColumnCustomizerService,
    private customerProductsService: CustomerProductsService,
    private messageService: NzMessageService,
    private activeRoute: ActivatedRoute,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
    this.customerId = this.activeRoute.parent?.snapshot.paramMap.get('customerId');
    if (this.customerId) {
      this.fetchCustomerProducts();
    }
  }

  fetchCustomerProducts(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.customerProductsService.getByCodeParams<CustomerProductsGetDto[]>(this.customerId, { pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res?.status === 'SUCCESS' && res.payload) {
          const { data = [], totalElements = 0 } = res.payload;
          this.originalCustomerProducts = data;
          this.customerProducts = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => {
        console.error('Error fetching customer products:', err);
      }
    });
  }

  async deleteCustomerProducts(item: any) {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.BRANCH];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.customerProductsService.delete(item.prodId).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Customer product deleted successfully.');
            this.fetchCustomerProducts();
          } else {
            this.messageService.error(res.message || 'Failed to delete customer product.');
          }
        },
        error: (err) => {
          console.error('Delete customer product error:', err);
          this.messageService.error('An unexpected error occurred while deleting the customer product.');
        }
      });
    }
  }

  openForm(type: OperationType, technicianData?: any): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add Product',
      [OperationType.Edit]: 'Edit Product',
      [OperationType.View]: 'Product Information',
      [OperationType.MassUpload]: 'Branch Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type] || 'Product Information',
      nzContent: isMassUpload ? BulkUploadComponent : CustomerProductsFormComponent,
      nzData: {
        type,
        data: technicianData || {}
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchCustomerProducts();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
  }

  handleSearchChange(): void {
    const query = this.searchValue.toLowerCase().trim();
    // this.filteredData = this.dataSet.filter(item =>
    //   item.name.toLowerCase().includes(query)
    // );
  }

  toggleFilterPanel(): void {
    this.filterPanelOpen = !this.filterPanelOpen;
  }

  exportAs(format: 'PDF' | 'EXCEL'): void {
    console.log(`Exporting as ${format}`);
  }

  applyFilter(filters: any) {
    console.log('Filtered Data:', filters);
  }
}
