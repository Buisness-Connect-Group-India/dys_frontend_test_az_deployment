import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchGroupTableComponent } from './branch-group-table.component';

describe('BranchGroupTableComponent', () => {
  let component: BranchGroupTableComponent;
  let fixture: ComponentFixture<BranchGroupTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchGroupTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchGroupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
