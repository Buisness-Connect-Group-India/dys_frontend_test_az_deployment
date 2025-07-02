import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelMasterTableComponent } from './label-master-table.component';

describe('LabelMasterTableComponent', () => {
  let component: LabelMasterTableComponent;
  let fixture: ComponentFixture<LabelMasterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelMasterTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelMasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
