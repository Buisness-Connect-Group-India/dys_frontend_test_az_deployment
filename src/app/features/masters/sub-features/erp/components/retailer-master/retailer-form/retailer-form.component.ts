import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../../../core/enums/operationtype.enum';
import { RetailerService } from '../services/retailer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-retailer-form',
  standalone: false,
  templateUrl: './retailer-form.component.html',
  styleUrl: './retailer-form.component.scss'
})
export class RetailerFormComponent {
  retailerForm!: FormGroup;
  data: any = null;
  OperationType = OperationType;
  operationType: OperationType;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private retailerService: RetailerService,
    private messageService: NzMessageService,
    @Inject(NZ_DRAWER_DATA) public drawerData: any
  ) {
    this.operationType = drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.operationType === OperationType.Edit && this.data) {
      this.retailerForm.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.retailerForm = this.fb.group({
      retailerCode: ['', Validators.required],
      retailerName: ['', Validators.required],
      contactPer1: [''],
      branchCode: [''],
      addr1: [''],
      addr2: [''],
      addr3: [''],
      landmark: [''],
      countryCode: [''],
      stateCode: [''],
      cityCode: [''],
      postCode: [''],
      offTelNo: [''],
      offExtnNo: [''],
      resTelNo: [''],
      mobileNo: [''],
      fax: [''],
      emailId: ['', [Validators.email]],
      altEmailId: ['', [Validators.email]],
      activeStatus: [true]
    });
  }

  onSubmit(): void {
    if (this.retailerForm.invalid) {
      this.retailerForm.markAllAsTouched();
      return;
    }

    const formData ={ ...this.retailerForm.value,
       activeStatus: this.retailerForm.value.activeStatus ? 'Y' : 'N'
    }

    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.retailerService.create(formData).subscribe({
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
      this.retailerService.update(this.data.retailerCode, formData).subscribe({
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
    this.retailerForm.reset({ status: true });
  }

  onCancel(): void {
    this.drawerRef.close();
  }
}