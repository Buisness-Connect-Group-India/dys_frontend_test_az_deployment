import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpareItemFormComponent } from './spare-item-form.component';

describe('SpareItemFormComponent', () => {
  let component: SpareItemFormComponent;
  let fixture: ComponentFixture<SpareItemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpareItemFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpareItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
