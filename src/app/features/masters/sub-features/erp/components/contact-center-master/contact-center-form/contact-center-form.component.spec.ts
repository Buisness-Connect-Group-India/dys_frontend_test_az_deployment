import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCenterFormComponent } from './contact-center-form.component';

describe('ContactCenterFormComponent', () => {
  let component: ContactCenterFormComponent;
  let fixture: ComponentFixture<ContactCenterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactCenterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCenterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
