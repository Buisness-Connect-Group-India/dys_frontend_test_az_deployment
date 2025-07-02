import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintActivityComponent } from './complaint-activity.component';

describe('ComplaintActivityComponent', () => {
  let component: ComplaintActivityComponent;
  let fixture: ComponentFixture<ComplaintActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
