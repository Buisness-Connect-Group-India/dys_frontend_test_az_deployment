import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductsFormComponent } from './customer-products-form.component';

describe('CustomerProductsFormComponent', () => {
  let component: CustomerProductsFormComponent;
  let fixture: ComponentFixture<CustomerProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerProductsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
