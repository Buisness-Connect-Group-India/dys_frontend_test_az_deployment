import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUploadTableComponent } from './master-upload-table.component';

describe('MasterUploadTableComponent', () => {
  let component: MasterUploadTableComponent;
  let fixture: ComponentFixture<MasterUploadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterUploadTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterUploadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
