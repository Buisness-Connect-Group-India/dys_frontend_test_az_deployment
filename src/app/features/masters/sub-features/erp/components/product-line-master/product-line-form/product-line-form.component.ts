import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { ProductLinePostDto } from '../models/product-line.model';
import { ProductLineService } from '../services/product-line.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-line-form',
  standalone: false,
  templateUrl: './product-line-form.component.html',
  styleUrl: './product-line-form.component.scss'
})
export class ProductLineFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  productLineForm!: FormGroup;
  data: ProductLinePostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: any,
    private productLineService: ProductLineService,
    private messageService: NzMessageService
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.productLineForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.productLineForm = this.fb.group({
      prodTypeCode: ['', Validators.required],
      prodTypeDesc: ['', Validators.required],
      category: [null, Validators.required],
      status: [true]
    });
  }

  onSubmit(): void {
    if (this.productLineForm.invalid) {
      this.productLineForm.markAllAsTouched();
      return;
    }
    const formData = {
      ...this.productLineForm.value,
      status: this.productLineForm.value.status ? 'Y' : 'N'
    };
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.productLineService.create(formData).subscribe({
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
      this.productLineService.update(this.data.prodTypeCode, formData).subscribe({
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
    this.productLineForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}