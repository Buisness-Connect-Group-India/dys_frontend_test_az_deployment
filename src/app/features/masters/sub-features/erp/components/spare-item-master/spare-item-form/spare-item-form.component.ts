import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { SpareItemPostDto } from '../models/spare-item.model';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { SpareItemService } from '../services/spare-item.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-spare-item-form',
  standalone: false,
  templateUrl: './spare-item-form.component.html',
  styleUrl: './spare-item-form.component.scss'
})
export class SpareItemFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  spareItemForm!: FormGroup;
  data: SpareItemPostDto;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: any,
    private spareService: SpareItemService,
      private messageService: NzMessageService
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.spareItemForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.spareItemForm = this.fb.group({
      spItemCode: ['', Validators.required],
      spItemDesc: ['', Validators.required],
      uom: ['', Validators.required],
      prodTypeCode: ['', Validators.required],
      stockType: ['', Validators.required],
      minOrderQty: ['', Validators.required],
      cost: ['', Validators.required],
      price: ['', Validators.required],
      isActive:[true],
      remarks:['']
    });
  }

  onSubmit(): void {
    if (this.spareItemForm.invalid) {
      this.spareItemForm.markAllAsTouched();
      return;
    }

    const formData = this.spareItemForm.value;
    this.isSubmitting = false;

    if (this.operationType === OperationType.Create) {
      this.spareService.create(formData).subscribe({
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
    } else if (this.operationType === OperationType.Edit) {
      this.spareService.update(this.data.spItemCode, formData).subscribe({
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
    this.spareItemForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close();
  }
}