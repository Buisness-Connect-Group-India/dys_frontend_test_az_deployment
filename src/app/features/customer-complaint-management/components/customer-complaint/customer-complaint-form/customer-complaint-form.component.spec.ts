import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComplaintFormComponent } from './customer-complaint-form.component';

describe('CustomerComplaintFormComponent', () => {
  let component: CustomerComplaintFormComponent;
  let fixture: ComponentFixture<CustomerComplaintFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComplaintFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerComplaintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
