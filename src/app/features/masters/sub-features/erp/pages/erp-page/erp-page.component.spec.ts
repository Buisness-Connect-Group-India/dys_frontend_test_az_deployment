import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErpPageComponent } from './erp-page.component';

describe('ErpPageComponent', () => {
  let component: ErpPageComponent;
  let fixture: ComponentFixture<ErpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErpPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
