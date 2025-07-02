import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComplaintManagementPageComponent } from './customer-complaint-management-page.component';

describe('CustomerComplaintManagementPageComponent', () => {
  let component: CustomerComplaintManagementPageComponent;
  let fixture: ComponentFixture<CustomerComplaintManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComplaintManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerComplaintManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
