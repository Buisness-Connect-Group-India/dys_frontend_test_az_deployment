import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintAttachmentComponent } from './complaint-attachment.component';

describe('ComplaintAttachmentComponent', () => {
  let component: ComplaintAttachmentComponent;
  let fixture: ComponentFixture<ComplaintAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintAttachmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
