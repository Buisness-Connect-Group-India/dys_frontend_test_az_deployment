import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCenterTableComponent } from './contact-center-table.component';

describe('ContactCenterTableComponent', () => {
  let component: ContactCenterTableComponent;
  let fixture: ComponentFixture<ContactCenterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactCenterTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactCenterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
