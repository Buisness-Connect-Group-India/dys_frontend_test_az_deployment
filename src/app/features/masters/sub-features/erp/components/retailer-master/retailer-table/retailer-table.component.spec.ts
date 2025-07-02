import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerTableComponent } from './retailer-table.component';

describe('RetailerTableComponent', () => {
  let component: RetailerTableComponent;
  let fixture: ComponentFixture<RetailerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RetailerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
