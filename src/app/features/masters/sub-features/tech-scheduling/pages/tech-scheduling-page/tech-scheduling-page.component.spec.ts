import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSchedulingPageComponent } from './tech-scheduling-page.component';

describe('TechSchedulingPageComponent', () => {
  let component: TechSchedulingPageComponent;
  let fixture: ComponentFixture<TechSchedulingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechSchedulingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechSchedulingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
