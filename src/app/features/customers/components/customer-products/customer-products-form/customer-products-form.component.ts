import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-customer-products-form',
  standalone: false,
  templateUrl: './customer-products-form.component.html',
  styleUrl: './customer-products-form.component.scss'
})
export class CustomerProductsFormComponent {
  productsForm!: FormGroup;
  type: string = '';
  data: any = null;

  constructor(
    private fb: FormBuilder,
    private drawerRef: NzDrawerRef,
    @Inject(NZ_DRAWER_DATA) public drawerData: any
  ) {
    console.log(drawerData)
    if (drawerData) {
      this.type = drawerData.type;
      this.data = drawerData.data;
    }
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.productsForm = this.fb.group({
      prodTypeCode: [null, [Validators.required]],
      prodGrpCode: [null, [Validators.required]],
      prodCode: [null, [Validators.required]],
      alienModel: [null],
      brandCode: [null],
      macSrNo: [null],
      modelDesc: [null],
      purcDate: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.productsForm.valid) {
      this.drawerRef.close(this.productsForm.value);
    }
  }

  onReset(): void {
    this.productsForm.reset();
  }

  onCancel(): void {
    this.drawerRef.close();
  }
}
