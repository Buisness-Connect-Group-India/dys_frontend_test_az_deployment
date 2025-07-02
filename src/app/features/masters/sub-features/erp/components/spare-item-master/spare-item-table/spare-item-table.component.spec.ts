import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareItemTableComponent } from './spare-item-table.component';

describe('SpareItemTableComponent', () => {
  let component: SpareItemTableComponent;
  let fixture: ComponentFixture<SpareItemTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpareItemTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpareItemTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
