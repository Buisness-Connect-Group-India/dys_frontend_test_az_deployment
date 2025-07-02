import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailsComponentComponent } from './customer-details-component.component';

describe('CustomerDetailsComponentComponent', () => {
  let component: CustomerDetailsComponentComponent;
  let fixture: ComponentFixture<CustomerDetailsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDetailsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
