import { Component, DebugElement } from '@angular/core';
import { ClickOutsideDirective } from '../click-outside.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div appClickOutside (outsideClick)="handleClickOutside($event)">Click Outside Test</div>`
})
class TestClickOutsideComponent {
  handleClickOutside(event: Event) {}
}

describe('ClickOutsideDirective', () => {
  let component: TestClickOutsideComponent;
  let fixture: ComponentFixture<TestClickOutsideComponent>;
  let directiveEl: DebugElement;
  let directiveInstance: ClickOutsideDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClickOutsideDirective],
      declarations: [TestClickOutsideComponent]
    });

    fixture = TestBed.createComponent(TestClickOutsideComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(ClickOutsideDirective));
    directiveInstance = directiveEl.injector.get(ClickOutsideDirective);
  });

  it('should create an instance ClickOutsideDirective', () => {
    expect(directiveInstance).toBeTruthy();
  });

  describe('#MouseDown Events', () => {
    it('should emit outsideClick event if click is outside and canReadClick is true', () => {
      spyOn(component, 'handleClickOutside');
      directiveInstance.canReadClick = true;
      fixture.detectChanges();

      const event = new Event('mousedown');
      document.dispatchEvent(event);

      expect(component.handleClickOutside).toHaveBeenCalled();
    });

    it('should not emit outsideClick event if click is inside the element', () => {
      spyOn(component, 'handleClickOutside');
      directiveInstance.canReadClick = true;
      fixture.detectChanges();

      const event = new Event('mousedown');
      directiveEl.nativeElement.dispatchEvent(event);

      expect(component.handleClickOutside).not.toHaveBeenCalled();
    });

    it('should not emit outsideClick if canReadClick is false', () => {
      spyOn(component, 'handleClickOutside');
      directiveInstance.canReadClick = false;
      fixture.detectChanges();

      const event = new Event('mousedown');
      document.dispatchEvent(event);

      expect(component.handleClickOutside).not.toHaveBeenCalled();
    });
  });
});
