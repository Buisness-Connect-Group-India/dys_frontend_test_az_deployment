import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerConsentComponent } from './customer-consent.component';

describe('CustomerConsentComponent', () => {
  let component: CustomerConsentComponent;
  let fixture: ComponentFixture<CustomerConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerConsentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
