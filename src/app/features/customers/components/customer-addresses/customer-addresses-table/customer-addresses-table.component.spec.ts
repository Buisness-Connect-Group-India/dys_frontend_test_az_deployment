import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressesTableComponent } from './customer-addresses-table.component';

describe('CustomerAddressesTableComponent', () => {
  let component: CustomerAddressesTableComponent;
  let fixture: ComponentFixture<CustomerAddressesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerAddressesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddressesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
