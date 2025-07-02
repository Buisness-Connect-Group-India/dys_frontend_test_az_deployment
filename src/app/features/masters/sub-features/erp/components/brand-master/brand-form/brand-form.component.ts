import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { BrandPostDto } from '../models/brand.model';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { BrandService } from '../services/brand.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-brand-form',
  standalone: false,
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss'
})
export class BrandFormComponent {
  brandForm!: FormGroup;
  OperationType = OperationType;
  operationType: OperationType;
  data: BrandPostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: any,
    private brandService: BrandService,
    private messageService: NzMessageService
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.brandForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.brandForm = this.fb.group({
      brandCode: [null, [Validators.required]],
      brandDesc: [null,]
    });
  }

  onSubmit(): void {
    if (this.brandForm.invalid) {
      this.brandForm.markAllAsTouched();
      return;
    }

    const formData = this.brandForm.value;
    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.brandService.create(formData).subscribe({
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
      this.brandService.update(this.data.brandCode, formData).subscribe({
        next: (res) => {
          if (res.status == 'SUCCESS') {
            this.drawerRef.close(true);
            this.onReset();
            this.messageService.create('success', res.message);
          }
        },
        error: (error) => {
          console.error('Update failed', error);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }

  onReset(): void {
    this.brandForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(true);
  }
}