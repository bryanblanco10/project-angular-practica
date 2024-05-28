import { Component, DebugElement } from '@angular/core';
import { CheckElementIsVisibleDirective } from './check-element-is-visible.directive';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

@Component({
  template: `<div [appCheckElementIsVisible]="className">Check Element Is Visible Test</div>`
})
class TestCheckElementIsVisibleComponent {
  className = 'select-body-top';
}

describe('CheckElementIsVisibleDirective', () => {
  let component: TestCheckElementIsVisibleComponent;
  let fixture: ComponentFixture<TestCheckElementIsVisibleComponent>;
  let directiveEl: DebugElement;
  let directiveInstance: CheckElementIsVisibleDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckElementIsVisibleDirective],
      declarations: [TestCheckElementIsVisibleComponent]
    });

    fixture = TestBed.createComponent(TestCheckElementIsVisibleComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(CheckElementIsVisibleDirective));
    directiveInstance = directiveEl.injector.get(CheckElementIsVisibleDirective);
  });

  it('should create an instance CheckElementIsVisibleDirective', () => {
    expect(directiveInstance).toBeTruthy();
  });

  describe('#changeClassForElement Method', () => {
    it('should call changeClassForElement on init and window scroll', () => {
      spyOn(directiveInstance, 'changeClassForElement');

      directiveInstance.ngOnInit();
      expect(directiveInstance.changeClassForElement).toHaveBeenCalled();

      window.dispatchEvent(new Event('scroll'));
      expect(directiveInstance.changeClassForElement).toHaveBeenCalledTimes(2);
    });

    it('should correctly call isInViewport method when changeClassForElement() is called', fakeAsync(() => {
      spyOn(directiveInstance, 'isInViewport').and.callThrough();

      directiveInstance.changeClassForElement();

      tick(100);

      expect(directiveInstance.isInViewport).toHaveBeenCalled();

    }));
  });

  describe('#clearTimeout Method', () => {

    it('should clean up on destroy', () => {
      spyOn(window, 'clearTimeout');

      directiveInstance.ngOnInit();
      directiveInstance.ngOnDestroy();

      expect(window.clearTimeout).toHaveBeenCalledWith(jasmine.any(Number));
    });

  });

  describe('#renderer Service', () => {

    it('should correctly add class based on viewport status is false', fakeAsync(() => {
      const renderer = directiveInstance['renderer'];
      const elementRef = directiveInstance['elementRef'];
      spyOn(renderer, 'addClass');
      spyOn(renderer, 'removeClass');

      spyOn(directiveInstance, 'isInViewport').and.returnValue(false);
      directiveInstance.changeClassForElement();

      tick(100);

      expect(renderer.addClass).toHaveBeenCalledWith(elementRef.nativeElement, directiveInstance.classElement);
      expect(renderer.removeClass).not.toHaveBeenCalled();
    }));

    it('should correctly remove class based on viewport status is true', fakeAsync(() => {
      const renderer = directiveInstance['renderer'];
      const elementRef = directiveInstance['elementRef'];
      spyOn(renderer, 'addClass');
      spyOn(renderer, 'removeClass');

      spyOn(directiveInstance, 'isInViewport').and.returnValue(true);
      directiveInstance.changeClassForElement();

      tick(100);

      expect(renderer.removeClass).toHaveBeenCalledWith(elementRef.nativeElement, directiveInstance.classElement);
      expect(renderer.addClass).not.toHaveBeenCalled();

    }));

  });

  describe('#isInViewport method', () => {

    it('should correctly determine if element is in viewport', () => {
      const elementRef = directiveInstance['elementRef'];
      const clientHeight = 800;
      const clientWidth = 600;

      spyOnProperty(window, 'innerHeight').and.returnValue(clientHeight);
      spyOnProperty(window, 'innerWidth').and.returnValue(clientWidth);

      spyOn(elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({
        top: 100,
        left: 100,
        bottom: 700,
        right: 500
      });

      expect(directiveInstance.isInViewport()).toBeTrue();
    });

    it('should correctly determine if element is not in viewport', () => {
      const elementRef = directiveInstance['elementRef'];
      const clientHeight = 800;
      const clientWidth = 600;

      spyOnProperty(window, 'innerHeight').and.returnValue(clientHeight);
      spyOnProperty(window, 'innerWidth').and.returnValue(clientWidth);

      spyOn(elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({
        top: -100,
        left: -100,
        bottom: 900,
        right: 700
      });

      expect(directiveInstance.isInViewport()).toBeFalse();
    });
  });

});
