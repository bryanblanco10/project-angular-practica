import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqComponent } from './faq.component';
import { DomManipulateService } from '@utils/dom-manipulate.service';
import { BodyClassName } from '@models/enums';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;
  let domManipulateService: jasmine.SpyObj<DomManipulateService>;

  beforeEach(() => {
    domManipulateService = jasmine.createSpyObj('DomManipulateService', ['addBodyClass', 'removeBodyClass']);
    TestBed.configureTestingModule({
      imports: [FaqComponent],
      providers: [
        { provide: DomManipulateService, useValue: domManipulateService }
      ]
    });
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
  });

  it('should create FaqComponent', () => {
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
