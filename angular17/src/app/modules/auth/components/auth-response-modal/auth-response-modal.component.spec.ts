import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthResponseModalComponent } from './auth-response-modal.component';

describe('AuthResponseModalComponent', () => {
  let component: AuthResponseModalComponent;
  let fixture: ComponentFixture<AuthResponseModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthResponseModalComponent]
    });
    fixture = TestBed.createComponent(AuthResponseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
