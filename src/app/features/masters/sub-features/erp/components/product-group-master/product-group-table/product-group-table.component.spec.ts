import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupTableComponent } from './product-group-table.component';

describe('ProductGroupTableComponent', () => {
  let component: ProductGroupTableComponent;
  let fixture: ComponentFixture<ProductGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductGroupTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
