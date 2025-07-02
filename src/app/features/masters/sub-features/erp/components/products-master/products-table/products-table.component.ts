import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BulkUploadComponent } from '../../../../../../../shared/bulk-upload/components/bulk-upload/bulk-upload.component';
import { ConfirmationModalService } from '../../../../../../../shared/confirmation-modal/services/confirmation-modal.service';
import { SharedService } from '../../../../../../../shared/services/shared.service';
import { SpareItemFormComponent } from '../../spare-item-master/spare-item-form/spare-item-form.component';
import { ProductsFormComponent } from '../products-form/products-form.component';
import { ColumnCustomizerService } from '../../../../../../../shared/column-settings/services/column-customizer.service';
import { CustomColumn } from '../../../../../../../shared/column-settings/models/custom-column.model';
import { PaginationState } from '../../../../../../../shared/pagination-footer/models/pagination.model';
import { PaginationService } from '../../../../../../../shared/pagination-footer/services/pagination.service';
import { ProductsGetDto, ProductsPostDto } from '../models/products.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductsService } from '../services/products.service';
import { DynamicFilterField } from '../../../../../../../shared/dynamic-filter/models/dynamic-filter.model';

@Component({
  selector: 'app-products-table',
  standalone: false,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent {
  OperationType = OperationType;
  searchValue = '';
  pagination: PaginationState;
  products: ProductsGetDto[] = [];
  originalProducts: ProductsGetDto[] = [];
  filterPanelOpen = false;
  filterFields: DynamicFilterField[] = [
    { label: 'Search Criteria', formControlName: 'search', type: 'select', options: ['Active', 'Inactive'], required: true },
    { label: 'Condition', formControlName: 'status', type: 'select', options: ['Begins With', 'Equals To', 'Contains', 'Ends With'], required: false },
    { label: 'Enter Text', formControlName: 'name', type: 'text', required: false }
  ];
  tableColumns: CustomColumn[] = [
    {
      name: 'Product Code',
      key: 'prodCode',
      value: 'prodCode',
      width: 150,
      default: true,
      originalIndex: 0,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodCode.localeCompare(b.prodCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodCode)
    },
    {
      name: 'Product Description',
      key: 'prodDesc',
      value: 'prodDesc',
      width: 300,
      default: true,
      originalIndex: 1,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.prodDesc.localeCompare(b.prodDesc),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.prodDesc)
    },
    {
      name: 'Model Code',
      key: 'modelCode',
      value: 'modelCode',
      width: 150,
      default: true,
      originalIndex: 2,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.stateName.localeCompare(b.stateName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.stateName)
    },
    {
      name: 'Product Type',
      key: 'prodTypeCode',
      value: 'prodTypeCode',
      width: 150,
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
      name: 'Product Group',
      key: 'prodGrpCode',
      value: 'prodGrpCode',
      width: 150,
      default: true,
      originalIndex: 4,
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
      width: 150,
      default: true,
      originalIndex: 5,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.brandCode.localeCompare(b.brandCode),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.brandCode)
    },
    {
      name: 'Item Category',
      key: 'itemCat',
      value: 'itemCat',
      width: 150,
      default: true,
      originalIndex: 6,
      sortable: true,
      sortOrder: null,
      sortFn: (a, b) => a.itemCat.localeCompare(b.itemCat),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      filters: [],
      filterFn: (list, item) => list.includes(item.itemCat)
    },
    {
      name: 'Status',
      key: 'isActive',
      value: 'isActive',
      width: 100,
      default: true,
      originalIndex: 7,
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

  searchVisible:boolean=false;
  constructor(private drawerService: NzDrawerService,
    public sharedService: SharedService,
    public columnCustomizerService: ColumnCustomizerService,
    private confirmationModalService: ConfirmationModalService,
    private messageService: NzMessageService,
    private productsService: ProductsService,
    private paginationService: PaginationService) {
    this.pagination = this.paginationService.current;
  }

  ngOnInit(): void {
    this.paginationService.reset();
    this.fetchProducts();
  }

  fetchProducts(): void {
    const { pageIndex, pageSize } = this.paginationService.current;
    this.productsService.getAll({ pageNumber: pageIndex, pageSize }).subscribe({
      next: (res) => {
        if (res.status === 'SUCCESS') {
          const { data, totalElements } = res.payload;
          this.originalProducts = data;
          this.products = [...data];
          this.paginationService.update({ total: totalElements });
          this.pagination = this.paginationService.current;
        }
      },
      error: (err) => console.error('Error fetching product group:', err)
    });
  }

  async deleteProducts(item: ProductsGetDto): Promise<void> {
    const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.PRODUCTS];
    const confirmed = await this.confirmationModalService.openDeleteModal(content);
    if (confirmed) {
      this.productsService.delete(item.prodCode).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.success(res.message || 'Product deleted successfully.');
            this.fetchProducts();
          } else {
            this.messageService.error(res.message || 'Failed to delete product.');
          }
        },
        error: (err) => {
          console.error('Delete product error:', err);
          this.messageService.error('An unexpected error occurred while deleting the product.');
        }
      });
    }
  }

  openForm(type: OperationType, productData?: ProductsPostDto): void {
    const isMassUpload = type === OperationType.MassUpload;

    const titles: Record<OperationType, string> = {
      [OperationType.Create]: 'Add New Product',
      [OperationType.Edit]: 'Edit Product',
      [OperationType.View]: 'Product Information',
      [OperationType.MassUpload]: 'Product Mass Upload'
    };
    const defaultWidth = isMassUpload ? '40%' : '60%';
    const drawerRef = this.drawerService.create(<any>{
      nzTitle: titles[type],
      nzContent: isMassUpload ? BulkUploadComponent : ProductsFormComponent,
      nzData: {
        type,
        data: productData
      },
      nzMaskClosable: false,
      nzBodyStyle: { padding: '0' },
      nzWidth: this.sharedService.getDrawerWidth(defaultWidth),
      nzClosable: true
    });
    drawerRef.afterClose.subscribe((result) => {
      if (result === true) {
        this.fetchProducts();
      }
    });
  }

  onPageIndexChange(index: number): void {
    this.paginationService.update({ pageIndex: index });
    this.fetchProducts();
  }

  onPageSizeChange(size: number): void {
    this.paginationService.update({ pageSize: size, pageIndex: 1 });
    this.fetchProducts();
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