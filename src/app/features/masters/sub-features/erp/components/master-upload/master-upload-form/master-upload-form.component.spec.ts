import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterUploadFormComponent } from './master-upload-form.component';

describe('MasterUploadFormComponent', () => {
  let component: MasterUploadFormComponent;
  let fixture: ComponentFixture<MasterUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterUploadFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
