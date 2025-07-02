import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMasterTableComponent } from './area-master-table.component';

describe('AreaMasterTableComponent', () => {
  let component: AreaMasterTableComponent;
  let fixture: ComponentFixture<AreaMasterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaMasterTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaMasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
