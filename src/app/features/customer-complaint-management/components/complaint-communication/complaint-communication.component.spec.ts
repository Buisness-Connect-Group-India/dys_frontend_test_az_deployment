import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintCommunicationComponent } from './complaint-communication.component';

describe('ComplaintCommunicationComponent', () => {
  let component: ComplaintCommunicationComponent;
  let fixture: ComponentFixture<ComplaintCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintCommunicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
