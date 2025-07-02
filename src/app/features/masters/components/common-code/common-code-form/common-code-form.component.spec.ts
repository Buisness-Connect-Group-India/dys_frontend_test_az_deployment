import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCodeFormComponent } from './common-code-form.component';

describe('CommonCodeFormComponent', () => {
  let component: CommonCodeFormComponent;
  let fixture: ComponentFixture<CommonCodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonCodeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
