import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerComplaintTableComponent } from './customer-complaint-table.component';

describe('CustomerComplaintTableComponent', () => {
  let component: CustomerComplaintTableComponent;
  let fixture: ComponentFixture<CustomerComplaintTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComplaintTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerComplaintTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
