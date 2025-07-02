import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { ProductsPostDto } from '../models/products.model';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { ProductsService } from '../services/products.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-products-form',
  standalone: false,
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  productsForm!: FormGroup;
  data: ProductsPostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: any,
    private productService: ProductsService,
    private messageService: NzMessageService
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.operationType === OperationType.Edit && this.data) {
      this.productsForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.productsForm = this.fb.group({
      prodCode: [null, Validators.required],
      prodDesc: [null, Validators.required],
      modelCode: [null, Validators.required],
      prodTypeCode: [null, Validators.required],
      prodGrpCode: [null, Validators.required],
      brandCode: [null, Validators.required],
      itemCat: [null, Validators.required],
      status: [true]
    });
  }

  onSubmit(): void {
    if (this.productsForm.invalid) {
      this.productsForm.markAllAsTouched();
      return;
    }
    const formData = {
      ...this.productsForm.value,
      activeStatus: this.productsForm.value.status ? 'Y' : 'N'
    };
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.productService.create(formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success', res.message);
          }
        },
        error: (error) => {
          this.messageService.create('error', error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.productService.update(this.data.prodCode, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success', res.message);
          }
        },
        error: (error) => {
          this.messageService.create('error', error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.productsForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}