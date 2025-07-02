import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { CONFIRMATION_MODAL_CONTENT } from '../../../../../core/constants/confirmation.constants';
import { ConfirmationModalType } from '../../../../../core/enums/confirmation.enum';
import { OperationType } from '../../../../../core/enums/operationtype.enum';
import { ConfirmationModalService } from '../../../../../shared/confirmation-modal/services/confirmation-modal.service';


@Component({
  selector: 'app-customer-form',
  standalone: false,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  OperationType = OperationType;
  operationType: OperationType;

  billingAddressVisible = false;

  customerDetailsForm!: FormGroup;
  serviceAddressForm!: FormGroup;
  billingAddressForm!: FormGroup;

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
    private confirmationModalService: ConfirmationModalService,
    private cdr: ChangeDetectorRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: { type: OperationType; data: any }
  ) {
    this.operationType = this.drawerData.type;
  }

  ngOnInit(): void {
    const data = this.drawerData?.data ?? {};

    this.customerDetailsForm = this.fb.group({
      salutation: [data.salutation || null],
      firstName: [data.firstName || null],
      middleName: [data.middleName || null],
      lastName: [data.lastName || null],
      mobileNo: [data.mobileNo || null],
      emailId: [data.emailId || null],
    });

    this.serviceAddressForm = this.fb.group({
      salutation: [data.salutation || null],
      firstName: [data.firstName || null],
      lastName: [data.lastName || null],
      addr1: [data.addr1 || null],
      addr2: [data.addr2 || null],
      addr3: [data.addr3 || null],
      addr4: [data.addr4 || null],
      addr5: [data.addr5 || null],
      landmark: [data.landmark || null],
      countryCode: [data.countryCode || null],
      stateCode: [data.stateCode || null],
      cityCode: [data.cityCode || null],
      areaCode: [data.areaCode || null],
      postCode: [data.postCode || null],
      mobileNo: [data.mobileNo || null],
      altMobileNo: [data.altMobileNo || null],
      emailId: [data.emailId || null],
      altEmailId: [data.altEmailId || null],
      offPhone: [data.offPhone || null],
      offExtnNo: [data.offExtnNo || null],
      resiNo: [data.resiNo || null],
      faxNo: [data.faxNo || null],
    });

    this.billingAddressForm = this.fb.group({
      salutation: [data.salutation || null],
      firstName: [data.firstName || null],
      lastName: [data.lastName || null],
      addr1: [data.addr1 || null],
      addr2: [data.addr2 || null],
      addr3: [data.addr3 || null],
      addr4: [data.addr4 || null],
      addr5: [data.addr5 || null],
      landmark: [data.landmark || null],
      countryCode: [data.countryCode || null],
      stateCode: [data.stateCode || null],
      cityCode: [data.cityCode || null],
      areaCode: [data.areaCode || null],
      postCode: [data.postCode || null],
      mobileNo: [data.mobileNo || null],
      altMobileNo: [data.altMobileNo || null],
      emailId: [data.emailId || null],
      altEmailId: [data.altEmailId || null],
      offPhone: [data.offPhone || null],
      offExtnNo: [data.offExtnNo || null],
      resiNo: [data.resiNo || null],
      faxNo: [data.faxNo || null],
    });
  }

  copyServiceToBilling(): void {
    if (this.serviceAddressForm.valid) {
      this.billingAddressForm.patchValue(this.serviceAddressForm.value);
    } else {
      this.serviceAddressForm.markAllAsTouched();
    }
  }


  toggleBillingAddress(): void {
    if (this.billingAddressVisible) {
      const content = CONFIRMATION_MODAL_CONTENT[ConfirmationModalType.BILLING_ADDRESS];
      this.confirmationModalService.openDeleteModal(content).then((confirmed: boolean) => {
        if (confirmed) {
          this.billingAddressVisible = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.billingAddressVisible = true;
      this.cdr.detectChanges();
    }
  }

  onSubmit(): void {
    if (this.customerDetailsForm.valid && this.serviceAddressForm.valid) {
      const result = {
        ...this.customerDetailsForm.value,
        ...this.serviceAddressForm.value,
        ...this.billingAddressForm.value
      };
      this.drawerRef.close(result);
    } else {
      this.customerDetailsForm.markAllAsTouched();
      this.serviceAddressForm.markAllAsTouched();
      this.billingAddressForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.customerDetailsForm.reset();
    this.serviceAddressForm.reset();
    this.billingAddressForm.reset();
    this.billingAddressVisible = false;
  }

  onCancel(): void {
    this.drawerRef.close(null);
    this.onReset();
  }
}