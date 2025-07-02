import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../core/enums/operationtype.enum';
import { CustomerAddressesService } from '../services/customer-addresses.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerAddressesPostDto } from '../models/custome-addresses.model';

@Component({
  selector: 'app-customer-addresses-form',
  standalone: false,
  templateUrl: './customer-addresses-form.component.html',
  styleUrl: './customer-addresses-form.component.scss'
})
export class CustomerAddressesFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  customerAddressForm!: FormGroup;
  isSubmitting: boolean = false;
  data: CustomerAddressesPostDto;
  salutations = ['Mr.', 'Ms.', 'Dr.', 'Mrs.'];
  countries = [
    { code: 'IN', name: 'India' },
  ];

  states = [
    { code: 'MH', name: 'Maharashtra' },
    { code: 'KA', name: 'Karnataka' }
  ];

  cities = [
    { code: 'MUM', name: 'Mumbai' },
    { code: 'BLR', name: 'Bengaluru' }
  ];

  areas = [
    { code: 'A1', name: 'AREA 1' },
    { code: 'A2', name: 'AREA 2' }
  ];

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    private messageService: NzMessageService,
    private customerAddressesService: CustomerAddressesService,
    @Inject(NZ_DRAWER_DATA) public drawerData: { type: OperationType; data: any }
  ) {
    this.operationType = this.drawerData.type;
    this.data = drawerData.data || null;
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.operationType === OperationType.Edit && this.data) {
      this.customerAddressForm.patchValue(this.data);
    }
  }

  initializeForm() {
    this.customerAddressForm = this.fb.group({
      salutation: [null],
      firstName: [null],
      lastName: [null],
      addr1: [null],
      addr2: [null],
      addr3: [null],
      addr4: [null],
      addr5: [null],
      landmark: [null],
      countryCode: [null],
      stateCode: [null],
      cityCode: [null],
      areaCode: [null],
      branchCode: [null],
      postCode: [null],
      mobileNo: [null],
      altMobileNo: [null],
      emailId: [null],
      altEmailId: [null],
      offPhone: [null],
      offExtnNo: [null],
      resiNo: [null],
      faxNo: [null],
      status: [false]
    });

    // "mainAddress": "Y",
    //   "custId": "C25021200003",
    //     "aType": "S",
    //       "updatedBy": "admin"
  }


  onSubmit(): void {
    if (this.customerAddressForm.invalid) {
      this.customerAddressForm.markAllAsTouched();
      return;
    }

    // const formData = this.customerAddressForm.value;

      const formData = {
    ...this.customerAddressForm.value,
    mainAddress: 'Y',
    custId: this.data?.custId || 'C25021200003',
    aType: 'S',
    updatedBy: 'admin',
    status:'Y'
  };

    this.isSubmitting = true;

    if (this.operationType === OperationType.Create) {
      this.customerAddressesService.create(formData).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.create('success', res.message)
            this.drawerRef.close(true);
            this.onReset();
          }
        },
        error: (error) => {
          this.messageService.create('error', error.message)
          console.error('Create failed', error);
        },
        complete: () => this.isSubmitting = false
      });
    } else if (this.operationType === OperationType.Edit) {
      this.customerAddressesService.update(this.data.addrId, formData).subscribe({
        next: (res) => {
          if (res.status === 'SUCCESS') {
            this.messageService.create('success', res.message)
            this.drawerRef.close(true);
            this.onReset();
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
    this.customerAddressForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close(null);
    this.onReset();
  }
}
