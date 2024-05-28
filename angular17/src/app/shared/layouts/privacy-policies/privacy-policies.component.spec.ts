import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPoliciesComponent } from './privacy-policies.component';
import { DomManipulateService } from '@utils/dom-manipulate.service';
import { BodyClassName } from '@models/enums';

describe('PrivacyPoliciesComponent', () => {
  let component: PrivacyPoliciesComponent;
  let fixture: ComponentFixture<PrivacyPoliciesComponent>;
  let domManipulateService: jasmine.SpyObj<DomManipulateService>;

  beforeEach(() => {
    domManipulateService = jasmine.createSpyObj('DomManipulateService', ['addBodyClass', 'removeBodyClass']);
    TestBed.configureTestingModule({
      imports: [PrivacyPoliciesComponent],
      providers: [
        { provide: DomManipulateService, useValue: domManipulateService }
      ]
    });
    fixture = TestBed.createComponent(PrivacyPoliciesComponent);
    component = fixture.componentInstance;
    component.hasBackground = false;
    fixture.detectChanges();
  });

  it('should create PrivacyPoliciesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should add background class if hasBackground is true', () => {
    component.hasBackground = true;
    component.ngOnInit();

    expect(domManipulateService.addBodyClass).toHaveBeenCalledWith(BodyClassName.FAQ_BODY);
  });

  it('should not add background class if hasBackground is false', () => {
    component.hasBackground = false;
    fixture.detectChanges();
    expect(domManipulateService.addBodyClass).not.toHaveBeenCalled();
  });

  it('should remove background class on destroy', () => {
    component.ngOnDestroy();

    expect(domManipulateService.removeBodyClass).toHaveBeenCalledWith(BodyClassName.FAQ_BODY);
  });
});
