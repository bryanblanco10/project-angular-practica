import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPlusComponent } from './avatar-plus.component';

describe('AvatarPlusComponent', () => {
  let component: AvatarPlusComponent;
  let fixture: ComponentFixture<AvatarPlusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvatarPlusComponent]
    });
    fixture = TestBed.createComponent(AvatarPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
