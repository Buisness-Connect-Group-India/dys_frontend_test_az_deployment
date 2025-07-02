import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressesFormComponent } from './customer-addresses-form.component';

describe('CustomerAddressesFormComponent', () => {
  let component: CustomerAddressesFormComponent;
  let fixture: ComponentFixture<CustomerAddressesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAddressesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddressesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
