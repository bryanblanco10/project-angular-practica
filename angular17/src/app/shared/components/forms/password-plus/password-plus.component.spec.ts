import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordPlusComponent } from './password-plus.component';

describe('PasswordPlusComponent', () => {
  let component: PasswordPlusComponent;
  let fixture: ComponentFixture<PasswordPlusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PasswordPlusComponent]
    });
    fixture = TestBed.createComponent(PasswordPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
