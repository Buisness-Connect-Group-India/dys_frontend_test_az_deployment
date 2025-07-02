import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianTableComponent } from './technician-table.component';

describe('TechnicianTableComponent', () => {
  let component: TechnicianTableComponent;
  let fixture: ComponentFixture<TechnicianTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechnicianTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicianTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
