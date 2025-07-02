import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaMasterFormComponent } from './area-master-form.component';

describe('AreaMasterFormComponent', () => {
  let component: AreaMasterFormComponent;
  let fixture: ComponentFixture<AreaMasterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaMasterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaMasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
