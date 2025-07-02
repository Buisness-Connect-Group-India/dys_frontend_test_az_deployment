import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { OperationType } from '../../../../../core/enums/operationtype.enum';

@Component({
  selector: 'app-customer-complaint-form',
  standalone: false,
  templateUrl: './customer-complaint-form.component.html',
  styleUrl: './customer-complaint-form.component.scss'
})
export class CustomerComplaintFormComponent {
  OperationType = OperationType;
  operationType: OperationType;
  currentStep = 0;

  customerDetailsForm!: FormGroup;
  addressForm!: FormGroup;
  productForm!: FormGroup;
  orderForm!: FormGroup;

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

  productTypes = [
    { code: 'PT01', name: 'Home Appliances' },
    { code: 'PT02', name: 'Consumer Electronics' },
    { code: 'PT03', name: 'Kitchen Appliances' }
  ];

  productGroups = [
    { code: 'PG01', name: 'Refrigerators', typeCode: 'PT01' },
    { code: 'PG02', name: 'Washing Machines', typeCode: 'PT01' },
    { code: 'PG03', name: 'Televisions', typeCode: 'PT02' },
    { code: 'PG04', name: 'Microwaves', typeCode: 'PT03' }
  ];

  products = [
    {
      code: 'P001',
      name: 'Double Door Fridge',
      groupCode: 'PG01',
      brand: 'CoolTech'
    },
    {
      code: 'P002',
      name: 'Front Load Washing Machine',
      groupCode: 'PG02',
      brand: 'AquaWash'
    },
    {
      code: 'P003',
      name: 'LED Smart TV 43"',
      groupCode: 'PG03',
      brand: 'VisionPlus'
    },
    {
      code: 'P004',
      name: 'Convection Microwave',
      groupCode: 'PG04',
      brand: 'HeatWave'
    }
  ];

  callTypes = ['Installation', 'Repair', 'Maintenance', 'Inspection'];
  coverageTypes = ['Under Warranty', 'Out of Warranty', 'AMC'];
  repairTypes = ['Onsite', 'Offsite', 'Remote Support'];
  receivedModes = ['Phone', 'Email', 'Walk-in', 'Online Portal'];
  receivedByList = ['Admin', 'Support Team', 'Call Center', 'Technician'];
  priorityLevels = ['Low', 'Medium', 'High', 'Critical'];

  constructor(private fb: FormBuilder, @Inject(NZ_DRAWER_DATA) public drawerData: { type: OperationType; data: any }, private drawerRef: NzDrawerRef,) {
    this.operationType = this.drawerData.type;
    console.log("this.operationType",this.operationType )
  }

  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.customerDetailsForm = this.fb.group({
      name: [''],
      mobileNo: [''],
      altMobileNo: [''],
      email: ['']
    });

    this.addressForm = this.fb.group({
      salutation: [''],
      firstName: [''],
      lastName: [''],
      addr1: [''],
      addr2: [''],
      addr3: [''],
      addr4: [''],
      addr5: [''],
      landmark: [''],
      countryCode: [''],
      stateCode: [''],
      cityCode: [''],
      areaCode: [''],
      postCode: [''],
      mobileNo: [''],
      altMobileNo: [''],
      emailId: [''],
      altEmailId: [''],
      offPhone: [''],
      offExtnNo: [''],
      resiNo: [''],
      faxNo: [''],
    });

    this.productForm = this.fb.group({
      prodTypeCode: [''],
      prodGrpCode: [''],
      prodCode: [''],
      model: [''],
      brand: [''],
      macSrNo: [''],
      modelDesc: [''],
      purcDate: ['']
    });

    this.orderForm = this.fb.group({
      callersName: [''],
      callType: [''],
      coverageType: [''],
      repairType: [''],
      receivedMode: [''],
      receivedBy: [''],
      priority: [''],
      description: [''],
      specialRequest: ['']
    });
  }

  next(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prev(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onReset(): void {
    switch (this.currentStep) {
      case 0:
        this.customerDetailsForm.reset();
        break;
      case 1:
        this.addressForm.reset();
        break;
      case 2:
        this.productForm.reset();
        break;
      case 3:
        this.orderForm.reset();
        break;
    }
  }

  onCancel(): void {
    this.drawerRef.close(null);
    this.onReset();
  }

  onSubmit(): void {
    if (
      this.customerDetailsForm.valid &&
      this.addressForm.valid &&
      this.productForm.valid &&
      this.orderForm.valid
    ) {
      const payload = {
        ...this.customerDetailsForm.value,
        address: this.addressForm.value,
        product: this.productForm.value,
        order: this.orderForm.value
      };

      console.log('Final Submission Payload:', payload);

    } else {
      console.log('Please fill all required fields.');
    }
  }
}