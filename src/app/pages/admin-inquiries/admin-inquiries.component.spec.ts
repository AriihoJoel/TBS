import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInquiriesComponent } from './admin-inquiries.component';

describe('AdminInquiriesComponent', () => {
  let component: AdminInquiriesComponent;
  let fixture: ComponentFixture<AdminInquiriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminInquiriesComponent]
    });
    fixture = TestBed.createComponent(AdminInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
