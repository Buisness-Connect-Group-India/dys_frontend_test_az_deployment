import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { ProductGroupPostDto } from '../models/product-group.model';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { ProductGroupService } from '../services/product-group.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-group-form',
  standalone: false,
  templateUrl: './product-group-form.component.html',
  styleUrl: './product-group-form.component.scss'
})
export class ProductGroupFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  data: ProductGroupPostDto;
  isSubmitting: boolean = false;
  productGroupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: any,
    private productGrpService: ProductGroupService,
    private messageService: NzMessageService
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.productGroupForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.productGroupForm = this.fb.group({
      prodGrpCode: ['', Validators.required],
      prodGrpDesc: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productGroupForm.invalid) {
      this.productGroupForm.markAllAsTouched();
      return;
    }

    const formData = this.productGroupForm.value;
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.productGrpService.create(formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success', res.message);
          }
        },
        error: (error) => {
           this.messageService.create('success', error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.productGrpService.update(this.data.prodGrpCode, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success', res.message);
          }
        },
        error: (error) => {
         this.messageService.create('success', error.error.message);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.productGroupForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}