import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelMasterFormComponent } from './label-master-form.component';

describe('LabelMasterFormComponent', () => {
  let component: LabelMasterFormComponent;
  let fixture: ComponentFixture<LabelMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LabelMasterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
