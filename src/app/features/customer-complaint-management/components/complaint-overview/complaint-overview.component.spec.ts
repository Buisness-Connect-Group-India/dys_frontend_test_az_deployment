import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintOverviewComponent } from './complaint-overview.component';

describe('ComplaintOverviewComponent', () => {
  let component: ComplaintOverviewComponent;
  let fixture: ComponentFixture<ComplaintOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplaintOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
