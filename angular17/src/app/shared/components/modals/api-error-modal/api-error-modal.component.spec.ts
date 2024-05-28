import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrorModalComponent } from './api-error-modal.component';

describe('ApiErrorModalComponent', () => {
  let component: ApiErrorModalComponent;
  let fixture: ComponentFixture<ApiErrorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiErrorModalComponent]
    });
    fixture = TestBed.createComponent(ApiErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
