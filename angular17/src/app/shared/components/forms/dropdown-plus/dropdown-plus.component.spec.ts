import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DropdownPlusComponent } from './dropdown-plus.component';
import { DropdownPlus } from '@models/interfaces';
import { By } from '@angular/platform-browser';
import { CheckElementIsVisibleDirective } from './directives/check-element-is-visible.directive';

describe('DropdownPlusComponent', () => {
  let component: DropdownPlusComponent<DropdownPlus>;
  let fixture: ComponentFixture<DropdownPlusComponent<DropdownPlus>>;
  const mockOptions: DropdownPlus[] = [
    { name: 'Option 1', value: '1' },
    { name: 'Option 2', value: '2' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownPlusComponent, CheckElementIsVisibleDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownPlusComponent);
    component = fixture.componentInstance;
    component.label = 'Test Label';
    component.options = mockOptions;
    component.showOptions = true;
    component.optionTemplateRef = null;
    fixture.detectChanges();
  });

  it('should create DropdownPlusComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should accept inputs correctly', () => {
    component.label = 'Test Label';
    component.options = mockOptions;
    fixture.detectChanges();

    expect(component.label).toBe('Test Label');
    expect(component.options).toBe(mockOptions);
  });

  describe('UI interactions', () => {
    it('should toggle options visibility on click', () => {
      const buttonEl = fixture.debugElement.query(By.css('.cont-base'));
      component.showOptions = false;
      buttonEl.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(component.showOptions).toBeTrue();
    });

    it('should select option correctly', () => {
      component.optionTemplateRef = null;
      component.options = mockOptions;
      component.showOptions = true;
      const fakeEvent = {
        stopPropagation: jasmine.createSpy('stopPropagation')
      };

      fixture.detectChanges();

      const optionEl = fixture.debugElement.query(By.css('.select-item'));
      optionEl.triggerEventHandler('click', fakeEvent);
      fixture.detectChanges();

      expect(component.picked).toBe(mockOptions[0]);

    });

    it('should call closeOptions when the click was outside and the dropdown is open', () => {
      spyOn(component, 'closeOptions');
      component.showOptions = true;
      fixture.detectChanges();

      const event = new Event('mousedown');
      document.dispatchEvent(event);

      expect(component.closeOptions).toHaveBeenCalled();
    });

    it('should not call closeOptions when the click was inside and the dropdown is open', () => {
      spyOn(component, 'closeOptions');
      component.showOptions = true;
      fixture.detectChanges();

      const event = new Event('mousedown');
      fixture.nativeElement.dispatchEvent(event);

      expect(component.closeOptions).not.toHaveBeenCalled();
    });

    it('should add classElementIsNotVisible when .select-body element is not visible', fakeAsync(() => {
      component.showOptions = true;
      component.classElementIsNotVisible = 'select-body-top';
      fixture.detectChanges();

      const optionEl = fixture.debugElement.query(By.css('.select-body'));

      spyOn(optionEl.nativeElement, 'getBoundingClientRect').and.returnValue({
        top: -100,
        left: -100,
        bottom: 900,
        right: 700
      });
      const directiveInstance = optionEl.injector.get(CheckElementIsVisibleDirective);

      directiveInstance.changeClassForElement();

      tick(100);

      fixture.detectChanges();

      expect(optionEl.nativeElement.classList.contains('select-body-top')).toBe(true);

    }));

    it('should not add classElementIsNotVisible when .select-body element is visible', fakeAsync(() => {
      component.showOptions = true;
      component.classElementIsNotVisible = 'select-body-top';
      fixture.detectChanges();

      const optionEl = fixture.debugElement.query(By.css('.select-body'));

      spyOn(optionEl.nativeElement, 'getBoundingClientRect').and.returnValue({
        top: 100,
        left: 100,
        bottom: 700,
        right: 500
      });
      const directiveInstance = optionEl.injector.get(CheckElementIsVisibleDirective);

      directiveInstance.changeClassForElement();

      tick(100);

      fixture.detectChanges();

      expect(optionEl.nativeElement.classList.contains('select-body-top')).toBe(false);

    }));


  });
});
