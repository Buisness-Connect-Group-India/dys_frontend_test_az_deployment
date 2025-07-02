import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCodeTableComponent } from './common-code-table.component';

describe('CommonCodeTableComponent', () => {
  let component: CommonCodeTableComponent;
  let fixture: ComponentFixture<CommonCodeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonCodeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCodeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
