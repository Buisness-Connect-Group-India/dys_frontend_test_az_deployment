import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductsTableComponent } from './customer-products-table.component';

describe('CustomerProductsTableComponent', () => {
  let component: CustomerProductsTableComponent;
  let fixture: ComponentFixture<CustomerProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerProductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
