import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLineFormComponent } from './product-line-form.component';

describe('ProductLineFormComponent', () => {
  let component: ProductLineFormComponent;
  let fixture: ComponentFixture<ProductLineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductLineFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductLineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
