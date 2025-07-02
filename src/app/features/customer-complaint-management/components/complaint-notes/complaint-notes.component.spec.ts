import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintNotesComponent } from './complaint-notes.component';

describe('ComplaintNotesComponent', () => {
  let component: ComplaintNotesComponent;
  let fixture: ComponentFixture<ComplaintNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
