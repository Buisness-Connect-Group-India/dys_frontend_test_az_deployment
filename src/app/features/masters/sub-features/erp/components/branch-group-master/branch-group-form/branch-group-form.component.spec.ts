import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchGroupFormComponent } from './branch-group-form.component';

describe('BranchGroupFormComponent', () => {
  let component: BranchGroupFormComponent;
  let fixture: ComponentFixture<BranchGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchGroupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
