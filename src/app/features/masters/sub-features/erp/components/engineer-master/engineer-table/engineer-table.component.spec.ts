import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerTableComponent } from './engineer-table.component';

describe('EngineerTableComponent', () => {
  let component: EngineerTableComponent;
  let fixture: ComponentFixture<EngineerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngineerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
