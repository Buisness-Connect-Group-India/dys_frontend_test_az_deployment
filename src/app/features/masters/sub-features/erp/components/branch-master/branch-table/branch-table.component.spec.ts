import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTableComponent } from './branch-table.component';

describe('BranchTableComponent', () => {
  let component: BranchTableComponent;
  let fixture: ComponentFixture<BranchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
